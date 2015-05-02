var caplet  = require("caplet");
var routes  = require("./routes");
var mesh    = require("mesh");
var memory  = require("mesh-memory");

module.exports = caplet.createModelClass({
  initialize: function() {
    this.bus = mesh.noop;
    routes(this);
  },
  load: function() {

  }
});
