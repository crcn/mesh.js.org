var React = require("react");
var IDE   = require("../../ide");
// var StarFighter = require("examples/starfighter2/components/game ");

module.exports = React.createClass({
  render: function() {

    // <div className="navigation">
    //   <a href="//github.com/mojo-js/mesh.js">GitHub</a>
    // </div>

    // TODO - add starfighter example here
    return (
      <div>

        <div className="row header">
          <div className="tagline">
            <h1><strong>Mesh</strong> it all up.</h1>
            <p>A featherlight JavaScript message bus for creating sophisticated applications</p>
          </div>
        </div>

        <div className="row punchline content">
          <p>Mesh gives you the utilities needed to build a sophisticated messaging layer that facilitates *all* remote, or local communication for your application.
          Server-side and client-side.</p>
        </div>
      </div>
    );
  }
});
