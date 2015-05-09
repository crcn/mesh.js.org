var caplet   = require("caplet");
var Entities = require("./entities");
var mesh     = require("mesh");
var extend   = require("xtend/mutable");

module.exports = caplet.createModelClass({
  tick: function() {

    if (Math.random() > 0.98) this.ship.shootPhaser();
    if (Math.random() > 0.3) this.ship.move(2);
    if (Math.random() > 0.95) {
      if (this._rotate) {
        this._rotate = 0;
      } else {
        this._rotate = Math.random() > 0.5 ? -3 : 3;
      }
    }

    if (this._rotate) {
      this.ship.rotate(this._rotate);
    }
  }
});
