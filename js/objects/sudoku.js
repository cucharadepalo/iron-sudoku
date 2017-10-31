function Sudoku() {
  this.size = 9;
  this.boxSize = 3;
  this.digits = [1,2,3,4,5,6,7,8,9];
  this.board = [];
  this.solvedBoard = [];
}

Sudoku.prototype.generateBoard = function() {
  this.board = predefinedBoards[0];
};

Sudoku.prototype.solveBoard = function() {
  this.board = predefinedSolved[0];
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

Sudoku.prototype.paintBoard = function() {
  var container = $("#sudoku-board"),
      tableBody = $("<tbody></tbody>"),
      index = {x:0, y:0, b:0};

  for (var i = 0; i < this.size; i++) {
    var tableRow = $("<tr></tr>")
                  .attr('index', i);
    for (var j = 0; j < this.size; j++) {
      index = {x:i, y:j, b: x-x%this.boxSize};
      var tableCell = $("<td></td>")
                      .attr("x", index.x)
                      .attr("y", index.y)
                      .attr("b", index.b+''+j-j%this.boxSize)
                      .html("<input type='text' value='" + this.board[i][j] + "'>");
      tableCell.appendTo(tableRow);
    }
    tableRow.appendTo(tableBody);
  }
  tableBody.appendTo(container);
};
