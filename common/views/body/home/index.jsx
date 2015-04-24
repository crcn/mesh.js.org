var React = require("react");
var IDE   = require("../../ide");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container home">

        <div className="row content header">
          <div className="col-sm-5 tagline">
            <h2>Mesh it all up.</h2>
            <span>A featherlight communication utility for building sophisticated features</span>
          </div>
          <div className="col-sm-7 hidden-xs">
            <div className="navigation">
              <a href="http://github.com/mojo-js/mesh.js">Download</a>
              <a href="/examples">Examples</a>
              <a href="/docs">Documentation</a>
              <a href="http://github.com/mojo-js/mesh.js">GitHub</a>
            </div>
            <IDE {...this.props} source="var color='red';" />
          </div>
        </div>

        <div className="row content sub-header">
          <div className="inner">
            <h2>Your one and only communication layer</h2>
            <p>
              Messaging is a complex thing. Mesh gives you the utilities needed to build a sophisticated messaging
              layer that facilitates <strong>all</strong> remote, or local communication for your application - server-side, or client-side.
            </p>
          </div>
        </div>
      </div>
    );
  }
});
