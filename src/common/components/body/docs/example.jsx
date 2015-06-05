var React = require("React");
var IDE   = require("common/components/ide");

module.exports = React.createClass({
  render: function() {
    return <IDE className="example" source={this.props.files[0].content} />;
  }
});
