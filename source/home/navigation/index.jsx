var React = require("react");
var Link  = require("../link");

module.exports = React.createClass({
  render: function() {
    return <div className="rx-navigation">

      <span href="/" className="logo">
        Mesh
      </span>

      <div className="links">
        <a href="//github.com/crcn/mesh.js/tree/docs">
          Documentation
        </a>
        <a className="hidden" href="https://github.com/mojo-js/mesh.js/tree/master/examples">
          Examples
        </a>
        <a href="https://groups.google.com/forum/#!forum/meshjs">
          Support
        </a>
        <a className="hidden" href="https://www.npmjs.com/search?q=meshjs">
          Plugins
        </a>
        <a href="http://github.com/mojo-js/mesh.js">
          GitHub
        </a>
      </div>
    </div>;
  }
})
