var Base = require("./entity");

module.exports = Base.extend({
  mixins: [
    require("./mixins/model")
  ],
  ttl: 1000 * 5,
  update: function() {

    // console.log(this.timestamp, this.ttl);
    if (Date.now() > this.timestamp + this.ttl) {
      return this.remove();
    }

    var r = 180-Math.abs(this.rotation);
    var s = 10;

    var x = Math.sin(r/180*Math.PI) * s;
    var y = Math.cos(r/180*Math.PI) * s;

    this.setProperties({ x: this.x + x, y: this.y + y });
    this.save();
  }
});
