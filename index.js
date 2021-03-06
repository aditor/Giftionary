var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var giphy = require('./giphy');

var port = process.env.PORT || 3000;
var holder = "";
var map = {};

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
	if (msg.substring(0,4) == '/gif') {
	    giphy.parseGiphyResponse(msg.substring(5), function(imageUrl) {
		io.emit('user-gif', imageUrl);
		holder = msg.substring(5);
	    });
	} else if (msg.substring(0,7) == '/answer') {
	    if (msg.substring(8) == holder) {
		io.emit('user-answer', socket.id + " CORRECT: " + msg.substring(8));
	    } else {
		console.log(holder);
		io.emit('user-answer', socket.id + " INCORRECT WITH: " + msg.substring(8));
	    }
	} else {

	    var splitArray = msg.split(' ');
	    console.log(splitArray);
	    for (i = 0; i < splitArray.length; i++){
		if (splitArray[i].length > 5) {
		    console.log(splitArray[i]);
		    if (map[splitArray[i]] === undefined) {
			console.log("here");
			map[splitArray[i]] = 1;
		    } else {
			var value = map[splitArray[i]];
			map[splitArray[i]] = value + 1;
		    }
		}
	    }
	    var response = {
		message: socket.id + ": " + msg,
		map: map
	    };
	    io.emit('user-message', response);
	    var splitArray = msg.split(' ');
	}
	console.log(map);
    });
});

exports.map = map;

// Starts the web server at the given port
http.listen(port, function(){
    console.log('Listening on ' + port);
});
