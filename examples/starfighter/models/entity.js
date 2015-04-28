var caplet = require("caplet");
var mesh   = require("mesh");

var _i = 0;

function createCID() {
  return Date.now() + "." + (++_i);
}

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
      velocity  : this.velocity,
      ownerId   : this.ownerId,
      type      : this.type
    };
  },
  initialize: function() {
    this.timestamp = Date.now();
    this.cid       = createCID();
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
