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
      cid       : this.cid,
      timestamp : this.timestamp,
      rotation  : this.rotation,
      velocity  : this.velocity
    };
  },
  initialize: function() {
    this.timestamp = Date.now();
  },
  explode: function() {

    // persist removal
    this.remove();

    // remove the entity immediately
    this.dispose();
  },
  update: function() {

  }
});
