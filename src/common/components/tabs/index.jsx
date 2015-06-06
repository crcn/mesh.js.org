var React = require("react");

function _toArray(value) {
  if (value == void 0) return [];
  return Object.prototype.toString.call(value) == "[object Array]" ? value : [value];
}
/**
 */

module.exports = React.createClass({

  /**
   */

  propTypes: {
   getContent  : React.PropTypes.func,
   getTabTitle : React.PropTypes.func
  },

  /**
   */

  getDefaultProps: function() {
    return {
      getContent: function(currentChild) {
        return currentChild;
      },
      getTabTitle: function(child) {
        return child.props.title;
      }
    };
  },

  /**
   */

  getInitialState: function() {
    return {
      currentChild: _toArray(this.props.children)[0]
    }
  },

  /**
   */

  showTab: function(child) {
    this.setState({ currentChild: child });
  },

  /**
   */

  render: function() {

    var children      = this.props.children;
    var getContent    = this.props.getContent;
    var getTabTitle   = this.props.getTabTitle;
    var currentChild  = this.state.currentChild;

    var className = "rx-tabs";

    if (this.props.className) {
      className += " " + this.props.className;
    }

    return <div className={className}>
      <ul className="nav">
        {
          _toArray(children).map(function(child, key) {
            var selected = child === currentChild;
            return <li className={selected ? "selected" : ""} key={key}>
              <button className="btn btn-primary" onClick={this.showTab.bind(this, child)}>
                {getTabTitle(child)}
              </button>
            </li>;
          }.bind(this))
        }
      </ul>

      <div className="tab-content">
        { getContent(currentChild) }
      </div>
    </div>;
  }
});
