var React = require("React");
var IDE   = require("common/components/ide");

module.exports = React.createClass({
  shouldComponentUpdate: function() {
    return false;
  },
  render: function() {
    return <IDE className="example" showGutter={false} source={this.props.files[0].content} />;
  }
});
