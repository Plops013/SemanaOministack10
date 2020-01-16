const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require ('../utils/parseStringAsArray')

// Funções de um controller index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    console.log(request.body);
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username }); // evita cadastros desnecessários

    if (!dev) {
      const api_response = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name = login, avatar_url, bio } = api_response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }

    //Exercicio opcional

    //update

    //delete

    return response.json(dev);
  }
}