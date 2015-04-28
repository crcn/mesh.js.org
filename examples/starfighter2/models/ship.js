var Entity = require("./entity");
var Bullet = require("./bullet");
var grp    = require("./utils/getRotationPoint");

module.exports = Entity.extend({
  slowdown: 0.5,
  bulletTTL: 1000 * 5,
  width: 30,
  height: 30,
  move: function(delta) {
    this.set("velocity", this.velocity + delta);
  },
  shootPhasers: function() {

    var p = grp(this);

    var x = this.x + this.height/2;
    var y = this.y + this.height/2;

    x += p.x * (this.width/2);
    y += p.y * (this.height/2);

    return this.space.addEntity({
      type: "bullet",
      ttl: this.bulletTTL,
      ownerId: this.cid,
      velocity: 10,
      rotation: this.rotation,
      x: Math.round(x),
      y: Math.round(y)
    });
  },
  update: function() {
    this.set("velocity", Math.max(this.velocity - this.slowdown, 0));
  }
});
