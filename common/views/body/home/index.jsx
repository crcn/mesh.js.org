var React = require("react");
var IDE   = require("../../ide");
var StarFighter = require("../../../../examples/starfighter/components/map");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="row header">

        <div className="navigation">
          <a href="//github.com/mojo-js/mesh.js">GitHub</a>
        </div>

        <div className="tagline">
          <h1><strong>Mesh</strong> it all up.</h1>
          <p>A featherlight JavaScript message bus for creating sophisticated applications</p>
        </div>

        <StarFighter />
      </div>
    );
  }
});
