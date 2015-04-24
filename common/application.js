var caplet  = require("caplet");
var bus     = require("./bus");
var routes  = require("./routes");

module.exports = caplet.createModelClass({
  initialize: function() {
    var b = bus(this.config);
    b = routes(b);
    this.bus = b;
  },
  load: function() {

  }
});
