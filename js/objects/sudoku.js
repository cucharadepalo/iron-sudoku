function Sudoku() {
  this.size = 9;
  this.boxSize = 3;
  this.digits = [1,2,3,4,5,6,7,8,9];
  this.board = [];
  this.solvedBoard = [];
}

Sudoku.prototype.generateBoard = function() {
  this.board = [
    [5,1,9,6,8,7,4,3,2], //0
    [7,2,4,9,1,3,6,5,8], //1
    [3,8,6,2,5,4,9,1,7], //2
    [1,7,8,3,4,5,2,9,6], //3
    [6,5,2,8,9,1,7,4,3], //4
    [9,4,3,7,2,6,5,8,1], //5
    [2,3,1,4,7,9,8,6,5], //6
    [4,6,7,5,3,8,1,2,9], //7
    [8,9,5,1,6,2,3,7,0]  //8
  ];
};

Sudoku.prototype.solveBoard = function() {
  this.board = [
    [5,1,9,6,8,7,4,3,2], //0
    [7,2,4,9,1,3,6,5,8], //1
    [3,8,6,2,5,4,9,1,7], //2
    [1,7,8,3,4,5,2,9,6], //3
    [6,5,2,8,9,1,7,4,3], //4
    [9,4,3,7,2,6,5,8,1], //5
    [2,3,1,4,7,9,8,6,5], //6
    [4,6,7,5,3,8,1,2,9], //7
    [8,9,5,1,6,2,3,7,0]  //8
  ];
};

Sudoku.prototype.push = function(e, index) {

};

Sudoku.prototype.pop = function(e, index) {

};

Sudoku.prototype.checkCell = function(value, index) {

};

Sudoku.prototype.checkBoard = function(player) {
  return player.board == this.solvedBoard;
};

Sudoku.prototype.getWinner = function() {
  return this.players.player1.time < this.players.player2.time ? this.players.player1.name + 'wins' : this.players.player2.name + 'wins';
};

Sudoku.prototype.status = function(player) {
  return player.hits < 81;
};
