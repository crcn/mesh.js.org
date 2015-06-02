var caplet  = require("caplet");
var routes  = require("./routes");
var Router  = require("./routes/router");

/**
 */

module.exports = caplet.createModelClass({

  /**
   */

  initialize: function() {
    this.router = new Router();
    routes(this);
  },

  /**
   */

  load: function() {

  }
});
