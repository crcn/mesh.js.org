var React      = require("react");
var Navigation = require("../../navigation");
var Link       = require("../../link");
var extend     = require("xtend/mutable");

// examples
// snippets
// modules
// architecture
var docs = {
  api : require("./api.md")
};

var examples = {
  react: {}
};

var pages = extend({}, docs, examples);


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

    // markdown examples
    for (var category in docs) {
      var doc = docs[category];
      sidebar.push(
        <li className="category">
          <Link alias="docsCategory" category={category} {...this.props}>{category}</Link>
        </li>
      );

      sidebar = sidebar.concat(doc.categories.map(function(subcategory) {
        return <li className="sub-category">
          <Link alias="docsSubcategory" category={category} subcategory={subcategory.id} {...this.props}>
            {subcategory.label.replace(/\(.*?\)/, " ( )")}
          </Link>
        </li>;
      }.bind(this)))
    }

    // examples
    sidebar.push(
      <li className="category">
        Examples
      </li>
    );

    for (var name in examples) {
      sidebar.push(
        <li className="sub-category">
          <Link alias="docsSubcategory" category="examples" subcategory={name} {...this.props}>
            {name}
          </Link>
        </li>
      );
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
            {React.createElement(pages[locationState.pages.docs] || pages.api, {
              components: components,
              state: this.props.state
            })}
          </div>
        </div>
      </div>
    );
  }
});
