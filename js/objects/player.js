function Player(name) {
  this.name = name;
  this.time = '00:00';
  this.hits = 0;
  this.board = [];
}

Player.prototype.getInitialHits = function() {
  var flatBoard = this.flattenBoard();
  var hits = flatBoard.reduce(function(a, e) {
    return (e !== 0) ? a + 1 : a;
  }, 0);
  return hits;
};

Player.prototype.flattenBoard = function() {
  return _.flatten(this.board);
};
