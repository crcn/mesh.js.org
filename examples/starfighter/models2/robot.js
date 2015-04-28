var caplet   = require("caplet");
var Entities = require("./entities");
var bus      = require("../bus");
var mesh     = require("mesh");
var extend   = require("xtend/mutable");

module.exports = caplet.createModelClass({
  update: function() {
    // console.log(this.ship);

    var props = {};

    if (Math.random() > 0.98) this.ship.shootPhaser();
    if (Math.random() > 0.3) props.move = 1;
    if (Math.random() > 0.95) {
      if (this._rotate) {
        this._rotate = 0;
      } else {
        this._rotate = Math.random() > 0.5 ? -2 : 2;
      }
    }

    if (this._rotate) {
      props.rotate = this._rotate;
    }


    this.ship.update(props);
  }
});
