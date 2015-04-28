var caplet = require("caplet");
var mesh   = require("mesh");


module.exports = caplet.createModelClass({
  bus: mesh.noop,
  x: 0,
  y: 0,
  rotation: 0,
  velocity: 0,
  mixins: [
    require("./mixins/model")
  ],
  toData: function() {
    return {
      x         : this.x,
      y         : this.y,
      width     : this.width,
      height    : this.height,
      cid       : this.cid,
      timestamp : this.timestamp,
      rotation  : this.rotation,
      velocity  : this.velocity,
      ownerId   : this.ownerId,
      type      : this.type
    };
  },
  explode: function() {

    // persist removal
    this.remove();

    // remove the entity immediately
    this.dispose();
  },
  tick: function() { }
});
