//For debugging purposes
var game, player, player1, player2;

function secondsToTime(secs){
  var hours = Math.floor(secs / (60 * 60));
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);
  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);
  minutes = '' + minutes;
  minutes.length < 2 ? minutes = '0' + minutes: minutes;
  seconds = '' + seconds;
  seconds.length < 2 ? seconds = '0' + seconds: seconds;
  var formated = minutes + ':' +  seconds;
  return minutes + ":" + seconds;
}

function consoleMsg(msg) {
  $('.console').text(msg);
  setTimeout(function(){
    $('.console').empty();
  },3000);
};

function init(){
  // Start screen
  var title = $('<h1 id="title">sudo q</h1>')
              .addClass('big');
  var namesContainer = $('<div id="player-inputs"></div>')
                    .addClass('main-message');
  var player1Input = $('<div></div>')
                    .html('<label for="player1" class="standard-label">Player 1 name:</label>' +
                    '<input type="text" class="big-input" value="' + globals.players.player1.name + '" id="player1">');
  var player2Input = $('<div></div>')
                    .html('<label for="player2" class="standard-label">Player 2 name:</label>' +
                    '<input type="text" class="big-input" value="' + globals.players.player2.name + '" id="player2">');
  var startButton = $("<button id='start-button'>Start</button>")
                    .addClass('big-button main-action')
                    .attr('type', 'button');

  namesContainer.append(player1Input, player2Input);
  $('body').prepend(title, namesContainer, startButton);

  $('#player-inputs input').on('change', function(e){
    var playerId = $(e.target).attr('id');
    var value = $(e.target).val();
    if (value != '') globals.players[playerId].name = value;
  });

  $('#start-button').on('click', function(e){
    // Title transition
    $('#title').removeClass('big').addClass('small');
    // Game creation
    game = new Sudoku(3);
    // Initialize game
    game.initialize();
  });

};

$(document).ready(init);
