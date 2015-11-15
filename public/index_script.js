var socket = io();

// When the user clicks on send button
$('#msg-click').click(function(){
  sendMessage();
});

// Or the user presses enter from the text box
$('#msg').keydown(function(event) {
  if (event.keyCode == 13) {
    sendMessage();
  }
});

var sendMessage = function() {
  socket.emit('message', $('#msg').val());

  $('#msg').val('');
};


// When we receive a user message, add to html list
socket.on('user-message', function(data) {
    var msg = data.message;
    var map = data.map;
    console.log(data);
    var new_msg = $('<li>').text(msg);
    $('#messages').append(new_msg);
    $('body,html').animate({scrollTop: $('#messages li:last-child').offset().top + 5 + 'px'}, 5);
    cloudList = [];
    for (var key in map) {
	cloudList.push([key, map[key]]);
    }
    console.log(cloudList);
    WordCloud(document.getElementById('cloud'), { list: cloudList, weightFactor: 5, minSize: 4 } );
});

// When we recieve a user message for gif command, display gif image
socket.on('user-gif', function(msg) {
    var img = $("<img src='" + msg + "' />");
    var new_msg = $('<li>').append(img);
    $('#messages').append(new_msg);
    $('body,html').animate({scrollTop: $('#messages li:last-child').offset().top + 100 + 'px'}, 2000);
});

// When we recieve a user message for answer command, display correct or incorrect
socket.on('user-answer', function(msg) {
    var new_msg = $('<li>').text(msg);
    $('#messages').append(new_msg);
    $('body,html').animate({scrollTop: $('#messages li:last-child').offset().top + 5 + 'px'}, 5);
});

