var React    = require("react");
var cx       = require("classnames");
var extend   = require("xtend/mutable");


// <link alias="home">content</link>
module.exports = React.createClass({

  /**
   */

  propTypes: {
    alias: React.PropTypes.string,
    query: React.PropTypes.object
  },

  /**
   */

  render: function() {


    var href;
    var className = this.props.className ? this.props.className + " " : "";



    className += "rx-link ";

    if (this.props.href) {
      href = this.props.href;
    } else {
      var router   = this.props.app.router;
      var location = this.props.app.router.location;
      var path     = router.getPath(this.props.alias || location.pathname || "/", {
        params : this.props,
        query  : extend({}, location.query, this.props.query)
      });


      // should also be selected for stuff like /app-callbacks & /app-callbacks/:guid
      className += cx({
        selected  : this.props.selected != void 0 ? this.props.selected : !!~String(location.pathname).indexOf(path.replace(/\?.*/,""))
      });

      href = path;
    }

    return (
      <a href={href} className={className}>
        {this.props.children}
      </a>
    );
  }
});
