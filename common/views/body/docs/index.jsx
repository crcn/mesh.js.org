var React = require("react");
var Navigation = require("../../navigation");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="rx-docs">
        <div className="row">
          <Navigation />
        </div>
        <div className="row main">
          <div className="col-sm-2 sidebar">
          </div>
          <div className="col-sm-10 docs">
            {
              Array.apply(null, new Array(100)).map(function() {
                return <div>fdfsfsd<br /></div>;
              })
            }
          </div>
        </div>
      </div>
    );
  }
});
