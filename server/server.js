
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
var path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    if(err) {
        return console.log(err);
    } else {
        console.log("mongodb connected")
    }

    

    sockets.connect(io, PORT);
    server.listen(http, PORT);

    const dbName = "chatDB"
    const db = client.db(dbName);

    const userCollect = db.collection('users')
    const groupCollect = db.collection('groups')
    const channelCollect = db.collection('channels')


// Login
    //Checks for user info then returns object
    require('./routes/postLogin.js')(app, userCollect);

// Channels
    //route for getting channel information
    require('./routes/get-channels.js')(channelCollect, app, ObjectID); 

// Groups
    //route for groups
    // require('./routes/get-groups')(app, groupCollect);

// Users
    // require('./routes/get-users.js')(app, userCollect, ObjectID);
    // require('./routes/get-user.js')(userCollect, app, ObjectID)
});


