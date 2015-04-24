var caplet  = require("caplet");
var bus     = require("./bus");

module.exports = caplet.createModelClass({
  initialize: function() {
    this.bus    = bus(this.config);
  },
  load: function() {

  }
});
