var extend   = require("xtend/mutable");
var caplet   = require("caplet");
var Url      = require("url");
var Location = require("./location");
var qs       = require("querystring");


/**
 * _setter for a deep path
 */

function _set(target, path, value) {
  var current = target;
  var pathParts = path.split(".");
  for (var i = 0, n = pathParts.length - 1; i < n; i++) {
    var key = pathParts[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[pathParts[i]] = value;
}

/**
 * getter for a deep path
 */

function _get(target, path) {
  var current = target;
  var pathParts = path.split(".");
  for (var i = 0, n = pathParts.length; i < n; i++) {
    var key = pathParts[i];
    if (!current[key]) return void 0;
    current = current[key];
  }
  return current;
}

/**
 */

function _bindWindowLocation(router) {

  // when the location changes in the hash, reflect that change
  // back down to the application state.
  window.onpopstate = function() {
    router.redirect(window.location.hash.replace("#", ""));
  }

  // watch the location for any change, stringify it, then reflect
  // that change in the location hash. This will ensure that the user
  // is able to reload the page and still maintain the application state
  router.location.watch(function() {
    // window.location.hash = router.location.toString();
  });
}

/**
 */

module.exports = caplet.createModelClass({

  /**
   */

  initialize: function() {
    this.location = new Location();
    this._routes = {};
    if (process.browser) {
      _bindWindowLocation(this);
    }
  },

  /**
   */

  bootstrap: function() {

    // redirect
    if (process.browser) {
      this.redirect("/" + location.hash.replace("#", ""));
    }
  },

  /**
   */

  addRoute: function(alias, pathname, handler) {
    if (!handler) handler = function() { };

    // convert something like /home/:id/path to /home/(\w+)/
    var pathTester = new RegExp("^" + pathname.replace(/(:[^\/]+)/g, "([^\/]+)") + "$");
    var paramNames = pathname.split("/").filter(function(path) {
      return path.charAt(0) === ":";
    }).map(function(pathname) {
      return pathname.substr(1);
    });

    this._routes[alias] = {
      pathTester: pathTester,
      getPathname: function(aliasOrPathname, options) {
        if (!options) options = {};

        if (!options.params) options.params = {};

        // add params
        if (aliasOrPathname !== alias) {
          aliasOrPathname.match(pathTester).slice(1).forEach(function(param, i) {
            _set(options.params, paramNames[i], param);
          });
        }

        var fullpath = pathname;

        pathname.match(pathTester).slice(1).forEach(function(param, i) {
          fullpath = fullpath.replace(param, _get(options.params, paramNames[i]));
        });

        return fullpath;
      },
      test: function(pathname) {
        return pathname === alias || pathTester.test(pathname);
      },
      handler: handler
    }
  },

  /**
   */

  redirect: function(aliasOrPathname, options) {

    if (!options) options = {};

    aliasOrPathname = aliasOrPathname.replace(/\/+/g, "/");

    var pathParts = Url.parse(aliasOrPathname, true);

    var route = this.getRoute(pathParts.pathname);

    this.location.setProperties(extend({
      pathname: route.getPathname(pathParts.pathname, options),
      params  : options.params,
      query   : extend({}, options.query, pathParts.query)
    }, options));

    route.handler(this.location);
  },

  /**
   */

  getPathname: function(aliasOrPathname, options) {
    return this.getRoute(aliasOrPathname).getPathname(aliasOrPathname, options);
  },

  /**
   */

  getPath: function(aliasOrPathname, options) {

    var pathname = this.getPathname(aliasOrPathname, options);

    return (new Location({
      pathname: pathname,
      query: options.query
    })).toString();
  },

  /**
   */

  getRoute: function(aliasOrPathname) {

    for (var alias in this._routes) {
      var route = this._routes[alias];
      if (route.test(aliasOrPathname)) return route;
    }

    throw new Error("route '" + aliasOrPathname + "' does not exist.");
  }
});
