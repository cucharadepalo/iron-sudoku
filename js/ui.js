//For debugging purposes
var game;

function init(){
	game = new Sudoku;
  game.generateBoard();
  game.solveBoard();
	game.paintBoard();
};

$(document).ready(init);
