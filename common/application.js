var caplet  = require("caplet");
var bus     = require("./bus");
var routes  = require("./routes");
var mesh    = require("mesh");

module.exports = caplet.createModelClass({
  initialize: function() {
    this.bus = mesh.parallel();
    routes(this);
  },
  load: function() {

  }
});
