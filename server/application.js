require("jsx-require-extension");

var Base = require("../common/application");
var http = require("./http");
var mesh = require("mesh");
var memory = require("mesh-memory");
var sift   = require("sift");

module.exports = Base.extend({
  initialize: function() {
    Base.prototype.initialize.call(this);
    this.bus = mesh.parallel(this.bus, mesh.tailable(memory(), function(a, b) {
      if (a.query) {
        return sift(a.query)(b.query);
      }
      return !a.collection || a.collection === b.collection;
    }));
    http(this);
  }
});
