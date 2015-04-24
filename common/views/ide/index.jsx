var React     = require("react");

var NoComp = React.createClass({
  render: function() {
    return <div></div>;
  }
});


var AceEditor = process.browser ? require("react-ace") : NoComp;
var cx        = require("classnames");

// tomorrow
module.exports = React.createClass({
  getInitialState: function() {
    return {

    }
  },
  toggleExpansion: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },
  render: function() {
    return (
      <div className={cx({
        ide: true,
        expanded: this.state.expanded,
        animated: true
      })}>
        <ul className="nav">
          <li></li>
          <li></li>
          <li onClick={this.toggleExpansion}></li>
        </ul>

        <AceEditor
          value={this.props.source}
          mode="java"
          theme="kuroir"
          height="100%"
          width="100%"
        />
      </div>
    );
  }
});
