var React    = require("react");
var cx       = require("classnames");
var extend   = require("xtend/mutable");


// <link alias="home">content</link>
module.exports = React.createClass({

  /**
   */

  propTypes: {
    alias: React.PropTypes.string,
    query: React.PropTypes.object
  },

  /**
   */

  render: function() {

    var href;
    var className = this.props.className ? this.props.className + " " : "";

    className += "rx-link ";

    return (
      <a href={this.props.href} className={className}>
        {this.props.children}
      </a>
    );
  }
});
