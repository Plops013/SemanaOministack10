const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
  nome: String,
  github_username: String,
  biografia: String,
  avatar_url: String,
  techs: [String], //vetor de strings
  location: {
    type: PointSchema,
    index: '2dsphere',
  }
})

module.exports = mongoose.model('Dev', DevSchema);