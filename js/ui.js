//For debugging purposes
var game, player1, player2;

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

	$('#sudoku-board input').on('keypress', function(e){
		game.turn === 1 ? player = player1 : player = player2;
		var element = $(e.target);
		var xindex = $(e.target).parent().attr('xindex');
		var yindex = $(e.target).parent().attr('yindex');
		console.log(xindex, yindex);
		game.checkCell(element, player);
		game.push(element, player);
	});
};

$(document).ready(init);
