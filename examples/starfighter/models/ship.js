var Base = require("./entity");
var extend = require("xtend/mutable");

module.exports = Base.extend({
  rotation: 0,
  vrotation: 0,
  velocity: 0,
  rotate: function(amount) {
    this.set("rotation", (this.rotation + amount) % 360);
  },
  move: function(delta) {
    this.velocity = Math.min(this.velocity + 0.2, 4);
    this.vrotation = this.rotation;
  },
  shootPhaser: function(onSave) {
    return this.stage.entities.addEntity(extend({}, properties, {
      type: "bullet",
      x: this.x,
      y: this.y,
      rotation: this.rotation
    }), onSave);
  },
  _updatePosition: function() {

    var r = 180-Math.abs(this.vrotation);
    var s = this.velocity = Math.max(this.velocity - 0.01, 0);

    var x = Math.sin(r/180*Math.PI) * s;
    var y = Math.cos(r/180*Math.PI) * s;

    this.setProperties({ x: this.x + x, y: this.y + y });
  },
  update: function() {
    this._updatePosition();
    this._keepInBounds();
    this.save();
  },
  _keepInBounds: function() {
    var mw = this.stage.getWidth();
    var mh = this.stage.getHeight();
    if (this.x > mw) this.set("x", 0);
    if (this.y > mh) this.set("y", 0);
    if (this.x < 0) this.set("x", mw);
    if (this.y < 0) this.set("y", mh);
  }
});
