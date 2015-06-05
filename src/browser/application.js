var Base             = require("common/application");
var Body             = require("common/components/body");
var React            = require("react");
var interceptAnchors = require("./plugins/interceptAnchors");

module.exports = Base.extend({
  initialize: function() {
    Base.prototype.initialize.call(this);
    interceptAnchors(this);
  },
  load: function(state) {
    this.router.bootstrap();
    this.renderBody(state);
  },
  renderBody: function(state) {
    this.state = state;
    React.render(React.createElement(Body, { state: state, app: this }), document.getElementById("app"));
  }
});
