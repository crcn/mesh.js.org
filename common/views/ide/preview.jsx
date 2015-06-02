var React   = require("react");
var bundle  = require("./bundle");

global.mio = require("mesh-socket.io");

module.exports = React.createClass({
  componentDidMount: function() {
    bundle([
      { entry: true, content: this.props.content, path: "/index.js" }
    ], true, this.onBundle.bind(this));
  },
  getInitialState: function() {
    return {
      logs: []
    }
  },
  onBundle: function(err, exports) {
    if (err) console.error(err);
    exports.initialize(this);
  },
  render: function() {
    return <div className="ide-preview">
      <ul className="logs">
        {
          this.state.logs.map(function(log) {
            return <li>log: {log}</li>;
          })
        }
      </ul>
    </div>;
  },
  captureLogs: function(console) {
    console.log = function() {
      var msg = Array.prototype.slice.call(arguments, 0).map(function(arg) {
        if (typeof arg === "object") return JSON.stringify(arg);
        return arg;
      }).join(" ");

      this.setState({
        logs: this.state.logs.concat(msg)
      })
    }.bind(this)
  }
});
