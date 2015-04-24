require("jsx-require-extension");

var Base = require("../common/application");
var bus  = require("./bus");
var http = require("./http");

module.exports = Base.extend({
  initialize: function() {
    Base.prototype.initialize.call(this);
    http(this.config);
  }
});
