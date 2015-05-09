var caplet   = require("caplet");
var Entities = require("./entities");
var mesh     = require("mesh");
var extend   = require("xtend/mutable");

module.exports = caplet.createModelClass({
  _rotate: 0,
  tick: function() {

    var vDelta = 0;

    if (Math.random() > 0.98) this.ship.shootPhaser();
    if (Math.random() > 0.3) vDelta = 2;
    if (Math.random() > 0.95) {
      if (this._rotate) {
        this._rotate = 0
      } else {
        this._rotate = Math.random() > 0.5 ? -3 : 3;
      }
    }

    this.ship.move(vDelta, this._rotate);
  }
});
