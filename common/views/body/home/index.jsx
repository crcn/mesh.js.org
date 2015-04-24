var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container home">
        <div className="row content header">
          <div className="col-sm-6 tagline">
            <h2>Mesh it all up.</h2>
            <span>A featherlight communication utility for building sophisticated features</span>
          </div>
          <div className="col-sm-6 hidden-xs">
            <div className="navigation">
              <a href="http://github.com/mojo-js/mesh.js">Download</a>
              <a href="/examples">Examples</a>
              <a href="/docs">Documentation</a>
              <a href="http://github.com/mojo-js/mesh.js">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
