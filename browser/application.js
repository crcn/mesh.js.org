var Base   = require("../common/application");
var bus    = require("./bus");
var Body   = require("../common/views/body");
var React  = require("react");
var router = require("./router");
var mesh   = require("mesh");

module.exports = Base.extend({
  initialize: function() {
    Base.prototype.initialize.call(this);
    router(this);
  },
  load: function(attrs) {
    this.renderBody(attrs);
    this.bus(mesh.op("load"));
  },
  renderBody: function(attrs) {
    this.attrs = attrs;
    React.render(React.createElement(Body, attrs), document.getElementById("app"));
  }
});
