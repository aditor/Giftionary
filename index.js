var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3000;

// Serve our index.html page at the root url
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Have express serve all of our files in the public directory
app.use(express.static('public'));

// Code in this block is run every time a new socketIO connection is made
io.on('connection', function (socket) {
  // socket.id is a unique id for each socket connection
  console.log(socket.id + ' connected');

  // The following two declarations create handlers for
  // socket events on this specific connection

  // You can do something when the connection disconnects
  socket.on('disconnect', function(){
    console.log(socket.id + ' disconnected');
  });

  // message is our custom event, emit the message to everyone
  socket.on('message', function(msg) {
    console.log("Message: " + msg);
    io.emit('user-message', socket.id + ": " + msg);
  });
});

// Starts the web server at the given port
http.listen(port, function(){
  console.log('Listening on ' + port);
});