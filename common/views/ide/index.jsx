var React     = require("react");

var NoComp = React.createClass({
  render: function() {
    return <div></div>;
  }
});


var _ref = 0;

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
      }) + (this.props.className ? " " + this.props.className : "")}>
        <ul className="nav">
          <li></li>
          <li></li>
          <li onClick={this.toggleExpansion}></li>
        </ul>

        <AceEditor
          value={this.props.source}
          mode="java"
          name={ "editor-" + (_ref++) }
          theme="xcode"
          height={(this.props.source || "").split("\n").length * 17}
          width="100%"
          highlightActiveLine={false}
          {...this.props}
        />
      </div>
    );
  }
});
