var React = require("react");
var Navigation = require("../../navigation");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="rx-docs">
        <div className="row">
          <Navigation {...this.props} />
        </div>
        <div className="row main">
          <div className="col-sm-2 sidebar">
            <ul>
              {
                this.props.state.docs.map(function(category) {
                  return <li className="category">
                    <span className="category-title">{category.value}</span>
                    <ul className="sub-category">
                      {
                        category.children.map(function(category) {
                          return <li>{category.value}</li>;
                        })
                      }
                    </ul>
                  </li>;
                })
              }
            </ul>
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
