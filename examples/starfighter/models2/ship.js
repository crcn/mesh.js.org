var Base    = require("./entity");
var extend  = require("xtend/mutable");
var mesh    = require("mesh");
var caplet  = require("caplet");
var Bullets = require("./bullets");

module.exports = Base.extend({
  rotation: 0,
  vrotation: 0,
  velocity: 0,
  initialize: function() {
    Base.prototype.initialize.call(this);
    this._waitForDisposal();
  },
  fromData: function(data) {
    return extend({}, data, {
      bullets: caplet.recycle(this.bullets, Bullets, {
        bus: mesh.accept(
          /load|tail/,
          mesh.attach({
            query: { ownerId: data.cid }
          }, this.bus),
          this.bus
        )
      })
    });
  },
  rotate: function(amount) {
    this.set("rotation", (this.rotation + amount) % 360);
  },
  move: function(delta) {
    this.velocity = Math.min(this.velocity + 0.2, 4);
    this.vrotation = this.rotation;
  },
  shootPhaser: function(onSave) {

    var r = 180 - this.rotation;

    if (r < 0) {
      r = 360 + r;
    }

    x = this.x + this.width/2;
    y = this.y + this.height/2;

    x += Math.sin(r/180*Math.PI) * (this.width/2 + 3)
    y += Math.cos(r/180*Math.PI) * (this.height/2 + 3);

    this.bullets.create({
      ownerId: this.cid,
      x: x,
      y: y,
      width: 2,
      height: 5,
      rotation: this.rotation
    }, onSave);
  },
  _updatePosition: function() {

    var r = 180-this.vrotation;

    if (r < 0) {
      r = 360 + r;
    }

    var s = this.velocity = Math.max(this.velocity - 0.05, 0);

    var x = Math.sin(r/180*Math.PI) * s;
    var y = Math.cos(r/180*Math.PI) * s;

    this.setProperties({ x: this.x + x, y: this.y + y });
  },
  update: function(props) {
    if (props.rotate) this.rotate(props.rotate);
    if (props.move) this.move(props.move);
    this._updatePosition();
    this._keepInBounds();
    if (this.bullets) this.bullets.update();
    this.save();
  },
  _keepInBounds: function() {
    var mw = this.stage.getWidth();
    var mh = this.stage.getHeight();
    if (this.x > mw) this.set("x", 0);
    if (this.y > mh) this.set("y", 0);
    if (this.x < 0) this.set("x", mw);
    if (this.y < 0) this.set("y", mh);
  },
  _waitForDisposal: function() {
    var tail = this.bus(mesh.op("tail")).on("data", function(op) {
      if (op.data.cid !== this.cid) return;
      if (op.name !== "remove") return;
      if (this._respawnOnDeath) this.respawn();
      this.emit("die");
      tail.end();
    }.bind(this));
  }
});
