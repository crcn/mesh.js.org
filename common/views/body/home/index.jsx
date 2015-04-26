var React = require("react");
var IDE   = require("../../ide");
var StarFighter = require("../../../../examples/starfighter/components/map");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="row header">
        <div className="tagline">
          <h1><strong>Mesh</strong> it all up.</h1>
          <p>A featherlight communication utility for building sophisticated features</p>
        </div>

        <StarFighter />
      </div>
    );
  }
});
