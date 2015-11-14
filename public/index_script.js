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
socket.on('user-message', function(msg) {
  var new_msg = $('<li>').text(msg);
  $('#messages').append(new_msg);
  $('body,html').animate({scrollTop: $('#messages li:last-child').offset().top + 5 + 'px'}, 5);
});