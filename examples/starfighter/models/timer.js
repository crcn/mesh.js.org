var caplet = require("caplet");
var mesh   = require("mesh");

/**
 */

module.exports = caplet.createModelClass({

  /**
   */

  bus: mesh.noop,
  fps: 30,

  /**
   */

  stop: function() {
    clearInterval(this._timer);
  },

  /**
   */

  start: function() {
    this.stop();
    this._timer = setInterval(this.tick.bind(this), 1000 / this.fps);
  },

  /**
   */

  tick: function() {
    this.bus(mesh.op("tick"));
  }
});
