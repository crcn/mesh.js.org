var Base = require("./entity");
var extend = require("xtend/mutable");

module.exports = Base.extend({
  rotation: 0,
  speed: 0,
  rotate: function(amount) {
    console.log(this.rotation);
    this.set("rotation", (this.rotation + amount) % 360);
    this.save();
  },
  move: function(amount) {
    this.speed = Math.min(this.speed + 0.5, 2);
    this._updatePosition();
  },
  shootPhaser: function() {

  },
  _updatePosition: function(force) {
    if (!force && this._ticking) return;

    var r = 180-Math.abs(this.rotation);
    var s = this.speed = Math.max(this.speed - 0.01, 0);

    if (!s) {
      this._ticking = false;
      return;
    }

    var x = Math.sin(r/180*Math.PI) * s;
    var y = Math.cos(r/180*Math.PI) * s;

    this.setProperties({ x: this.x + x, y: this.y + y });
    this.save();

    this._ticking = true;
    setTimeout(this._updatePosition.bind(this), 10, true);
  }
});
