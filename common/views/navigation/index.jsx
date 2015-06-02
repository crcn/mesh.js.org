var React = require("react");

module.exports = React.createClass({
  render: function() {
    return <div className="rx-navigation">

      <a href="/" className="logo">
        Mesh
      </a>

      <div className="links">
        <a href="/docs">
          Documentation
        </a>
        <a href="#">
          Examples
        </a>
        <a href="#">
          Support
        </a>
        <a href="https://www.npmjs.com/search?q=meshjs">
          Plugins
        </a>
        <a href="http://github.com/mojo-js/mesh.js">
          GitHub
        </a>
      </div>
    </div>;
  }
})
