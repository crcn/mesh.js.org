var React    = require("react");
var Home     = require("./home");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container body">
        <Home {...this.props} />
      </div>
    );
  }
});
