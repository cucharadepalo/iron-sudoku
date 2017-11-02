//For debugging purposes
var game, player1, player2;

function secondsToTime(secs){
  var hours = Math.floor(secs / (60 * 60));
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);
  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);
  return minutes + ":" + seconds;
}

function init(){
	game = new Sudoku;
  game.generateBoard();
  game.solveBoard();
	game.paintBoard();
	player1 = new Player('Player 1');
	player1.board = game.board;
	// Incrementamos el contador de hits del player con los
	// valores descubiertos del board inicial
	player1.hits = player1.getInitialHits();

	$('#sudoku-board input').on('focusout', function(e){
		//game.turn === 1 ? player = player1 : player = player2;
    player = player1;
		var element = $(e.target);
		var xindex = $(e.target).parent().attr('xindex');
		var yindex = $(e.target).parent().attr('yindex');
		//game.push(element, player);
		game.checkCell(element, player);
	});
};

$(document).ready(init);
