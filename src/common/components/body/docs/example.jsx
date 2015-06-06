var React = require("react");
var IDE   = require("common/components/ide");

module.exports = React.createClass({
  render: function() {
    return <IDE className="example" showGutter={false} source={this.props.files[0].content} />;
  }
});
