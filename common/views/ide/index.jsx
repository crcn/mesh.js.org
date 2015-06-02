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
      preview: !this.state.preview
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
      sections.content = <AceEditor
        onChange={this.onContentChange}
        value={this.state.content}
        mode="java"
        name={ "editor-" + (_ref++) }
        theme="clouds"
        width="100%"
        maxLines={Infinity}
        highlightActiveLine={false}
        {...this.props} />

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

        <div>
          { this.props.runnable !== false ? <button className="btn ptn-primary preview-button" onClick={this.showPreview}>{this.state.preview ? "show code" : "show preview"}</button> : void 0 }
          { sections.content }
        </div>

      </div>
    );
  }
});
