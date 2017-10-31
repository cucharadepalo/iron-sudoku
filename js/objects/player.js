function Player(name) {
  this.name = name;
  this.time = 0;
  this.hits = 0;
  this.board = [];
}

Player.prototype.getInitialHits = function() {
  var flatBoard = _.flatten(this.board);
  var hits = flatBoard.reduce(function(a, e) {
    return (e !== 0) ? a + 1 : a;
  }, 0);
  return hits;
};
