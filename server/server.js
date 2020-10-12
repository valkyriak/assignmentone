const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
var bodyParser = require('body-parser');
const io = require ('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

sockets.connect(io, PORT)
server.listen(http, PORT);

var path = require('path');


require('./routes/postLogin.js')(app,path);
require('./routes/postLoginafter.js')(app,path);
require('./routes/channels.js')(app, path);
require('./routes/groups.js')(app, path);
require('./routes/users.js')(app, path);
