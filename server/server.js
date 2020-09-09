const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require ('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sockets.connect(io, PORT)

server.listen(http, PORT);

var path = require('path');
// require('./routes/postLogin')(app,path);

// const http = require('http').Server(app);
// let server = http.listen(3000, function () {
//   let host = server.address().address;
//   let port = server.address().port;
//   console.log("Server listening on: " + host + "port: " + port);
// });

app.post('/api/auth', require('./routes/postLogin'));
