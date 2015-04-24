var React = require("react");

module.exports = React.createClass({
  render: function() {
    return <div onClick={this.handleClick}>main</div>;
  }
});
