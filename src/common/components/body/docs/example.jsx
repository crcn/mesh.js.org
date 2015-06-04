var React = require("React");
var IDE   = require("common/components/ide");

module.exports = React.createClass({
  render: function() {
    return <IDE source={this.props.files[0].content} />;
  }
});
