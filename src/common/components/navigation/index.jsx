var React = require("react");
var Link  = require("common/components/link");

module.exports = React.createClass({
  render: function() {
    return <div className="rx-navigation">

      <Link alias="home" className="logo" {...this.props}>
        Mesh
      </Link>

      <div className="links">
        <Link alias="docs" {...this.props}>
          Documentation
        </Link>
        <Link href="https://github.com/mojo-js/mesh.js/tree/master/examples">
          Examples
        </Link>
        <a href="https://groups.google.com/forum/#!forum/meshjs">
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
