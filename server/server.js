var express = require('express'); 
var app = express();

var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var path = require('path');
// require('./routes/postLogin')(app,path);

const http = require('http').Server(app);
let server = http.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server listening on: " + host + "port: " + port);
});

app.post('/api/auth', require('./routes/postLogin'));

// var bodyParser = require('body-parser');;
// app.use (bodyParser.json());

// //Static path to dist to serve angular webpage
// app.use(express.static(__dirname + '/../dist/my-app'));
// console.log(__dirname);


// app.listen(3000, '127.0.0.1', function(){
//     console.log("Server has started and is listening on port 3000.")
// });
