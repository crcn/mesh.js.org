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
      currentFile: this.props.files[0],
      _editorId: "editor-" + (_ref++)
    }
  },
  toggleExpansion: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },
  componentWillReceiveProps: function(props) {
    this.state.currentFile = props.files[0];
    this.state.preview = false;
  },
  showPreview: function() {
    this.setState({
      preview: !this.state.preview
    });
  },
  onContentChange: function(content) {
    // console.log(content, this.state.currentFile);
    this.state.currentFile.content = content;

    // console.log(this.prop)
  },
  setFile: function(file, event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ currentFile: file });
  },
  render: function() {


    var sections = {};

    if (this.state.preview) {
      sections.content = <Preview files={this.props.files} />;
    } else {
      sections.content = <AceEditor
        onChange={this.onContentChange}
        value={this.state.currentFile.content}
        mode="java"
        name={ this.state._editorId }
        theme="clouds"
        width="100%"
        maxLines={Infinity}
        highlightActiveLine={false}
        {...this.props} />

    }

    var sidebar;

    if (this.props.files.length > 1) {
      sidebar = <ul className="file-sidebar col col-sm-2">
        {this.props.files.map(function(file) {
          var label = file.path;
          return <li><a href="#" onClick={this.setFile.bind(this, file)}>{label}</a></li>
        }.bind(this))}
      </ul>;
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

        <div className="row inner-content">
            {sidebar}
            <div className={"col editor col-sm-" + (sidebar ? 10 : 12 )}>
              { sections.content }
            </div>
        </div>

          { this.props.runnable !== false ? <button className="btn btn-primary preview-button" onClick={this.showPreview}>{this.state.preview ? "show code" : "show preview"}</button> : void 0 }
      </div>
    );
  }
});
