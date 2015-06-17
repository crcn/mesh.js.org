var React   = require("react");
var bundle  = require("./bundle");

global.mio = require("mesh-socket.io");

module.exports = React.createClass({
  componentDidMount: function() {
    bundle(this.props.files, true, this.onBundle.bind(this));
  },
  getInitialState: function() {
    return {
      loading: true,
      logs: []
    };
  },
  onBundle: function(err, exports) {
    if (err) console.error(err);
    this.setState({ loading: false });
    setTimeout(function() {
      this.element = React.findDOMNode(this.refs.element);
      exports.initialize(this);
    }.bind(this), 100);
  },
  render: function() {
    if (this.state.loading) {
      return <div className="ide-preview-loading">browserifying...</div>;
    }
    return <div className="ide-preview">
      <div ref="element"></div>

      { this.state.logs.length ?
      <ul className="logs">
        {
          this.state.logs.map(function(log) {
            return <li className={log.level}>{log.level}: {log.text}</li>;
          })
        }
      </ul> : void 0 }
    </div>;
  },
  captureLogs: function(console) {

    function log(level) {
      var msg = Array.prototype.slice.call(arguments, 1).map(function(arg) {
        if (typeof arg === "object") return JSON.stringify(arg);
        return arg;
      }).join(" ");

      this.setState({
        logs: this.state.logs.concat({
          level: level,
          text : msg
        })
      });
    }

    console.log     = log.bind(this, "log");
    console.error   = log.bind(this, "error");
    console.notice  = log.bind(this, "notice");
    console.warning = log.bind(this, "warning");
    console.debug   = function() { };
  }
});
