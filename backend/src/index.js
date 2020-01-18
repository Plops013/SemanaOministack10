const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes')
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect('mongodb+srv://fabio:1004@cluster0-j2bff.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); //colocar antes das rotas

app.use(routes);
//http://portquiz.net:port testa qualquer porta, exemplo http://portquiz.net:52489

//Métodos Http: GET, POST, PUT, DELETE
//get -> bucando informação
//post -> criando alguma informação 
//put -> atualizando ou editando alguma informação
//delete -> deletar alguma informação

//Tipos de Paramêtros

//Query Params: req.query (Filtros, ordenaçãon paginação, ...)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (dados para criação ou alteração de um registro)

//MongoDB (não-relacional)

console.log('Server On')
server.listen(3333);