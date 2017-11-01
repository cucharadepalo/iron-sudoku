function Sudoku() {
  this.size = 9;
  this.boxSize = 3;
  this.digits = [1,2,3,4,5,6,7,8,9];
  this.board = [];
  this.solvedBoard = [];
  this.turn = 1;
}

Sudoku.prototype.generateBoard = function() {
  this.board = predefinedBoards[0];
};

Sudoku.prototype.solveBoard = function() {
  this.solvedBoard = predefinedSolved[0];
};

Sudoku.prototype.push = function(e, player) {
  var x = e.parent().attr('xindex');
  var y = e.parent().attr('yindex');
  var number = _.toNumber(e.val());
  // No admitimos valores fuera del rango
  number > 0 && number < 10 ? number : number = 0;
  // metemos el valor en el board del player
  player.board[x][y] = number;
  // Devolvemos el valor corregido al input
  var formated = number == 0 ? '' : number;
  $(e).val(formated);
};

// Este método es superfluo, el método push ya elimina del array
// los valores reemplazados
Sudoku.prototype.pop = function(e, player) {
  var x = e.parent().attr('xindex');
  var y = e.parent().attr('yindex');
  // borramos el valor del board del player
  _.fill(player.board[x], 0, y, y + 1);
};

Sudoku.prototype.checkCell = function(e, player) {
  var x = e.parent().attr('xindex');
  var y = e.parent().attr('yindex');
  var number = _.toNumber(e.val());
  var prevNumber = player.board[x][y];
  var rightNumber = this.solvedBoard[x][y];
  var finished = false;
  // si el valor es correcto aumentamos el contador de hits
  if (number == rightNumber) {
    prevNumber == 0 || prevNumber != rightNumber ? player.hits++ : player.hits;
  } else {
    prevNumber == rightNumber ? player.hits-- : player.hits;
  }
  if (player.hits == 81) {
    finished = this.checkBoard;
  }
  if (finished) {
    alert('Terminaste');
  }
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
      // definimos indices para poner en las celdas
      index = {xindex:0, yindex:0, box:0};

  for (var i = 0; i < this.size; i++) {
    // Creamos la fila
    var tableRow = $("<tr></tr>")
                  .attr('index', i);
    for (var j = 0; j < this.size; j++) {
      // ajustamos los indices
      index = {xindex:i, yindex:j, box: i - i % this.boxSize};
      var boxCol = j - j % this.boxSize;
      // Si el valor es 0 no lo pintamos y si tiene valor deshabilitamos el input
      var cellInput = $("<input></input>")
                      .attr("type", "number")
                      .attr("min", 1)
                      .attr("max", 9);
      if (this.board[i][j] === 0) {
        cellInput.val('');
        cellInput.addClass('editable');
      } else {
        cellInput.val(this.board[i][j]);
        cellInput.prop("disabled", true);
      }
      var cellValue = this.board[i][j] !== 0 ? this.board[i][j] : '';
      var tableCell = $("<td></td>")
                      .attr("xindex", index.xindex)
                      .attr("yindex", index.yindex)
                      .attr("box", index.box + '' + boxCol)
                      .append(cellInput);
                      //.html("<input type='text' value='" + cellValue + "'>");

      tableCell.appendTo(tableRow);
    }
    tableRow.appendTo(tableBody);
  }
  tableBody.appendTo(container);
};
