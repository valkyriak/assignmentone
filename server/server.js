const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);

const io = require ('socket.io')(http);

//Socket services
const sockets = require('./socket.js');
const server = require('./listen.js');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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
const users = require('./routes/get-users.js');
const groups = require('./routes/groups.js');
const channels = require('./routes/get-channels.js');

MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    if(err) {return console.log(err);}

    sockets.connect(io, PORT);
    server.listen(http, PORT);

    const dbName = "chatterDB"
    const db = client.db(dbName);

    const url = ''

    const userCollect = db.collection('users')
    const groupCollect = db.collection('groups')
    const channelCollect = db.collection('channels')


// Login
    require('./routes/postLogin.js')(app,userCollect);

// Channels
    //route for getting channel information
    require('./routes/get-channels.js')(channelCollect, app, ObjectID); 

// Groups
    require('./routes/groups.js')(app, path);

// Users
    require('./routes/get-users.js')(app, userCollect, ObjectID);
});


