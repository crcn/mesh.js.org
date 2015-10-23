var React = require('react');
var hljs = require('highlight.js');

var CodeComponent = React.createClass({
  componentWillMount: function () {
    this.highlight();
  },
  componentDidUpdate: function () {
    this.highlight();
  },
  highlight: function () {
    var language = this.props.language;
    var code = this.props.code;

    this.setState({
      highlightedCode: language ? hljs.highlight(language, code).value : void 0
    });
  },
  render: function () {
    var highlightedCode = this.state.highlightedCode || '';

    return React.createElement('pre', {key: this.props.key},
      React.createElement('code', {
        dangerouslySetInnerHTML: {__html: highlightedCode}
      })
    );
  }
});

module.exports = CodeComponent;
