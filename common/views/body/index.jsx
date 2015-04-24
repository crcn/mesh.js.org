var React    = require("react");
var Examples = require("./examples");
var Home     = require("./home");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="container home">
        {
          {
            home     : <Home {...this.props} />,
            examples : <Examples {...this.props} />
          }[this.props.pages.body]
        }
      </div>
    );
  }
});
