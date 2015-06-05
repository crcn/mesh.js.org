var React = require("react");

module.exports = React.createClass({
  componentDidUpdate: function() {
    this._scrollToView();
  },
  componentDidMount: function() {
    this._scrollToView();
  },
  _scrollToView: function() {
    if (this.props.state.pages.category === this.props.id) {
      React.findDOMNode(this.refs.header).scrollIntoView();
    }
  },
  render: function() {
    var className = this.props.state.pages.category === this.props.id ? "selected" : "";
    return <h4 ref="header" id={this.props.id} className={className}>{this.props.children}</h4>;
  }
});
