var caplet = require("caplet");

module.exports = caplet.createModelClass({
  x: 0,
  y: 0,
  rotation: 0,
  velocity: 0,
  mixins: [
    require("./mixins/model")
  ],
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
