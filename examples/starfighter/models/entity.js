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
  toJSON: function() {
    return {
      x         : this.x,
      y         : this.y,
      width     : this.width,
      height    : this.height,
      cid       : this.cid,
      rotation  : this.rotation,
      velocity  : this.velocity,
      ownerId   : this.ownerId,
      type      : this.type
    };
  },
  equals: function(model) {
    return model.cid === this.cid;
  },
  explode: function() {

    // persist removal
    this.remove();
  },
  tick: function() { }
});
