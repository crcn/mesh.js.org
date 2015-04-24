var Base  = require("../common/application");
var bus   = require("./bus");
var Body  = require("../common/views/body");
var React = require("react");

module.exports = Base.extend({
  initialize: function() {
    Base.prototype.initialize.call(this);
  },
  load: function() {
    React.render(React.createElement(Body), document.getElementById("app"));
  }
});
