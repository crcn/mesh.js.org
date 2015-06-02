var caplet = require("caplet");
var qs     = require("querystring");

/**
 */

module.exports = caplet.createModelClass({

  /**
   */

  state: { },
  query: { },

  /**
   */

  toString: function() {
    var path = this.pathname;

    if (this.query && !!Object.keys(this.query).length) {
      var q = {};

      // remove blank queries
      for (var key in this.query) {
        var v = this.query[key];
        if (v === "") continue;
        q[key] = v;
      }

      path += "?" + qs.stringify(q);
    }

    return path;
  }
});
