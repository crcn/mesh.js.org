var React = require("react");
var Navigation = require("../../navigation");

// examples
// snippets
// modules
// architecture
var docs = {
  api: require("./api.md")
};

var components = {
  Example: require("./example")
};

module.exports = React.createClass({
  render: function() {

    var sidebar = [];

    for (var category in docs) {
      var doc = docs[category];
      sidebar.push(
        <li className="category">
          {category}
        </li>
      );

      sidebar = sidebar.concat(doc.headers.h4.map(function(subcategory) {
        return <li className="sub-category">
          {subcategory}
        </li>;
      }))
    }

    return (
      <div className="rx-docs">
        <div className="row">
          <Navigation {...this.props} />
        </div>
        <div className="row main">
          <div className="col-sm-2 sidebar">
            <ul>
              {sidebar}
            </ul>
          </div>
          <div className="col-sm-10 docs">
            {React.createElement(docs.api, {
              components: components
            })}
          </div>
        </div>
      </div>
    );
  }
});
