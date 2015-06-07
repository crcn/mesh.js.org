var React      = require("react");
var Navigation = require("../../navigation");
var Link       = require("../../link");

// examples
// snippets
// modules
// architecture
var docs = {
  api          : require("./api.md")
};

var components = {
  Example : require("./example"),
  H4      : require("./h4"),
  Tabs    : require("../../tabs")
};

module.exports = React.createClass({
  render: function() {

    var sidebar = [];

    var locationState = this.props.state;

    var files = [
      { path: "index.js" },
      { path: "test.js" }
    ]

    for (var category in docs) {
      var doc = docs[category];
      sidebar.push(
        <li className="category">
          <Link alias="docsCategory" category={category} {...this.props}>{category}</Link>
        </li>
      );

      sidebar = sidebar.concat(doc.headers.h4.map(function(subcategory) {
        return <li className="sub-category">

          <Link alias="docsSubcategory" category={category} subcategory={subcategory.id} {...this.props}>
            {subcategory.label.replace(/\(.*?\)/, " ( )")}
          </Link>

          {
            locationState.pages.category === subcategory.id && false ?
            <ul className="files"> {(subcategory.files || files).map(function(file, i) {
              return <li key={i}>
                {file.path}
              </li>
            })}</ul>
            : void 0
          }
        </li>;
      }.bind(this)))
    }

    return (
      <div className="rx-docs">
        <div className="row">
          <Navigation {...this.props} />
        </div>
        <div className="row main">
          <div className="col-sm-2 sidebar hidden-xs">
            <ul>
              {sidebar}
            </ul>
          </div>
          <div className="col-sm-10 col-xs-12 docs">
            {React.createElement(docs[locationState.pages.docs] || docs.api, {
              components: components,
              state: this.props.state
            })}
          </div>
        </div>
      </div>
    );
  }
});
