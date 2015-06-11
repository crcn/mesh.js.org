var React = require("react");
var IDE   = require("../../ide");

module.exports = React.createClass({
  render: function() {
    return <IDE {...this.props} files={this.props.files} className="example" showGutter={false} />;
  }
});
