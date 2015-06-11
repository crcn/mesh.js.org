var React    = require("react");
var Examples = require("./examples");
var Home     = require("./home");
var Docs     = require("./docs");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container body">
        {
          {
            home     : <Home {...this.props} />,
            examples : <Examples {...this.props} />,
            docs     : <Docs {...this.props} />
          }[this.props.state.pages.body]
        }
      </div>
    );
  }
});
