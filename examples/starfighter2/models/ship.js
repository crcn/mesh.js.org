var Entity = require("./entity");
var Bullet = require("./bullet");

module.exports = Entity.extend({
  slowdown: 0.5,
  bulletTTL: 1000 * 5,
  move: function(delta) {
    this.set("velocity", this.velocity + delta);
  },
  shootPhasers: function() {
    this.space.addEntity({
      type: "bullet",
      ttl: this.bulletTTL,
      ownerId: this.cid,
      velocity: 10
    });
  },
  update: function() {
    this.set("velocity", Math.max(this.velocity - this.slowdown, 0));
  }
});
