var caplet = require("caplet");
var mesh   = require("mesh");

/**
 */

module.exports = caplet.createModelClass({

  /**
   */

  initialize: function() {
    this.bus(mesh.op("tail", { q: { name: "tick" }})).on("data", this.target.tick.bind(this.target));
  }
});
