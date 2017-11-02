function Sudoku(id) {
  this.size = 9;
  this.boxSize = 3;
  this.rightHits = this.size * this.size;
  this.digits = [1,2,3,4,5,6,7,8,9];
  this.board = [];
  this.solvedBoard = [];
  this.turn = 0;
  this.seconds = 0;
  this.chrono;
  this.sudokuId = id || Math.floor(Math.random() * 3);
}

Sudoku.prototype.initialize = function() {
  this.turn++;
  this.generateBoard();
  this.solveBoard();
  // Player creation
  player1 = new Player(globals.players.player1.name);
  // Because board is an array of literal values we need a
  // deep copy technique
  player1.board = _.cloneDeep(this.board);
  player1.hits = player1.getInitialHits();
  player2 = new Player(globals.players.player2.name);
  // Because board is an array of literal values we need a
  // deep copy technique
  player2.board = _.cloneDeep(this.board);
  player2.hits = player2.getInitialHits();
  // Initial screen
	this.transition();
};

Sudoku.prototype.transition = function() {
  var t = this;
  var literal;
  var message;
  var winner;
  var action = $('<img src="./img/countdown.gif" width="150" height="80" alt="Countdown" class="countdown">');
  if (this.turn == 1) {
    player = player1;
    // Screen cleaning
    $('.main-message').remove();
    $('.main-action').remove();
    // messages
    literal = globals.messages.firstPlayer;
    message = '<p><span class="player-label">' + player.name + ': </span>' + literal + '</p>';
  } else if (this.turn == 2) {
    player = player2;
    // Screen cleaning
    $('#sudoku-board').remove();
    $('#player').remove();
    $('#timer').remove();
    $('.console').remove();
    // messages
    literal = globals.messages.otherPlayers;
    message = '<p><span class="player-label">' + player.name + ': </span>' + literal + '</p>';
  } else {
    // Screen cleaning
    $('#sudoku-board').remove();
    $('#player').remove();
    $('#timer').remove();
    $('.console').remove();
    // messages
    winner = this.getWinner();
    message = '<p>' + globals.messages.winner + '</p><p><span class="player-label">' + winner + '</span></p>';
    action = '<p>Reload to play again</p>';
    // action = $("<button id='start-button'>Start again</button>")
    //          .addClass('big-button')
    //          .attr('type', 'button');
  }

  var mainMessage = $('<div></div>')
                    .addClass('main-message')
                    .html(message);
  var mainAction = $('<div></div>')
                    .addClass('main-action');

  action.appendTo(mainAction);

  // screen painting
  $('body').prepend(mainMessage, mainAction);

  if (this.turn != 0) {
    setTimeout(function(){
      mainMessage.remove();
      mainAction.remove();
      game.paintBoard();
      // Chrono
      t.chrono = setInterval(function(){
        t.timer();
      },1000);
      // Input event actions
      $('#sudoku-board input').on('focusout', function(e){
        if (this.turn == 1) player = player1;
        if (this.turn == 2) player = player2;
        var element = $(e.target);
        var xindex = $(e.target).parent().attr('xindex');
        var yindex = $(e.target).parent().attr('yindex');
        game.checkCell(element, player);
      });
    }, 3000);
  }
};

Sudoku.prototype.generateBoard = function() {
  // Because boards are arrays of literal values we need a
  // deep copy technique
  this.board = _.cloneDeep(predefinedBoards[this.sudokuId]);
};

Sudoku.prototype.solveBoard = function() {
  //this.solvedBoard = [];
  this.solvedBoard = predefinedSolved[this.sudokuId];
};

Sudoku.prototype.checkCell = function(e, player) {
  var x = e.parent().attr('xindex');
  var y = e.parent().attr('yindex');
  var number = _.toNumber(e.val());
  // No admitimos valores fuera del rango
  number > 0 && number < 10 ? number : number = 0;
  // recogemos el valor previo para aumentar o reducir los hits
  var prevNumber = player.board[x][y];
  var rightNumber = this.solvedBoard[x][y];
  // metemos el valor en el board del player
  player.board[x][y] = number;
  // si el valor es correcto aumentamos el contador de hits
  if (number == rightNumber) {
    prevNumber == 0 || prevNumber != rightNumber ? player.hits++ : player.hits;
    // Quitamos la clase de error
    $(e).removeClass('has-error').attr('g', false);
  } else {
    prevNumber == rightNumber ? player.hits-- : player.hits;
    // Le ponemos un atributo para marcarlo como errado
    $(e).attr('g','0');
  }
  // Si el player board está lleno llamamos a status
  var flatBoard = player.flattenBoard();
  if (flatBoard.indexOf(0) == -1) this._status(player);
  // Devolvemos el valor corregido al input
  var formated = number == 0 ? '' : number;
  $(e).val(formated);
};

Sudoku.prototype._status = function(player) {
  var finished = false;
  var t = this;
  // Comprobamos primero los hits y luego el tablero y si no
  // destacamos los errores
  if (player.hits == this.rightHits) finished = this.checkBoard(player);
  if (finished) {
    clearInterval(this.chrono);
    var formatedTime = secondsToTime(this.seconds);
    player.time = this.seconds;
    consoleMsg(globals.messages.finish);
    console.log('Game Finished. Time: ' + formatedTime);
    this.seconds = 0;
  } else {
    this.highlightErrors();
    consoleMsg(globals.messages.error);
    //$('.console').text(globals.messages.error);
  }
  if (finished && this.turn == 1) {
    setTimeout(function(){
      t.turn++;
      t.transition();
    }, 3000);
  } else if (finished && this.turn == 2) {
    setTimeout(function(){
      t.turn = 0;
      t.transition();
    }, 3000);
  }
};

Sudoku.prototype.timer = function() {
  this.seconds++;
  var time = secondsToTime(this.seconds);
  $("#timer").text(time);
};

Sudoku.prototype.highlightErrors = function() {
  $("#sudoku-board input[g='0']").addClass('has-error');
};

Sudoku.prototype.checkBoard = function(player) {
  return _.isEqual(player.board, this.solvedBoard);
};

Sudoku.prototype.getWinner = function() {
  var time, winner;
  if (player1.time < player2.time) {
    time = secondsToTime(player1.time);
    winner = player1.name /*+ ':' + time*/;
  } else if (player1.time > player2.time) {
    time = secondsToTime(player2.time);
    winner = player2.name /*+ ':' + time*/;
  } else {
    winner = globals.messages.draw;
  }
  return winner;
};

Sudoku.prototype.paintBoard = function() {
  var playerLabel = $("<div id='player'></div>")
                    .addClass('shown')
                    .text(player.name),
      timerLabel = $("<div id='timer'></div>")
                    .addClass('shown')
                    .text(secondsToTime(player.time)),
      consoleDiv = $("<div></div>")
                    .addClass('console');

  var container = $("<table id='sudoku-board'></table>"),
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
  $('body').prepend(playerLabel, consoleDiv, timerLabel, container);
};
