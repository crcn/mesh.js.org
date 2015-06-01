var React     = require("react");
var Preview   = require("./preview");

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
      preview: false,
      content: this.props.source
    }
  },
  componentDidMount: function() {

  },
  toggleExpansion: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },
  showPreview: function() {
    this.setState({
      preview: true
    });
  },
  onContentChange: function(content) {
    this.state.content = content;
  },
  render: function() {

    var sections = {};

    if (this.state.preview) {
      sections.content = <Preview content={this.state.content} />;
    } else {
      sections.content = <div>
        { this.props.runnable !== false ? <button className="btn ptn-primary preview-button" onClick={this.showPreview}>run example</button> : void 0 }
        <AceEditor
        onChange={this.onContentChange}
        value={this.state.content}
        mode="java"
        name={ "editor-" + (_ref++) }
        theme="xcode"
        // height={(this.props.source || "").split("\n").length * 17}
        // height="300px"
        width="100%"
        highlightActiveLine={false}
        {...this.props} />
      </div>
    }


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

        { sections.content }

      </div>
    );
  }
});
