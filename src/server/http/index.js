var express    = require("express");
var Body       = require("common/components/body");
var React      = require("react");
var mesh       = require("mesh");
var path       = require("path");
var less       = require("./less");
var realtime   = require("./realtime");
var glob       = require("glob");

module.exports = function(app) {

  var config = app.config;

  var server = express();
  var port   = config.get("http.port");

  console.log("listening on port %d", port);
  var prod = process.env.NODE_ENV === "production";

  server.use(express.static(config.get("directories.static")));

  less(app, server);

  function html(content) {
    return "<html>" +
      "<head>" +
        "<link href=\"/vendor/bootstrap/css/bootstrap.min.css\" rel=\"stylesheet\">" +
        "<link href=\"/bundle.css\" rel=\"stylesheet\">" +
        "<meta property=\"og:image\" content=\"http://mesh.mojojs.com/images/home/logo-shot.png\">" +
        "<meta name=\"Description\" content=\"A universal, streamable interface for synchronizing data\">" +
        "<link href=\"http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css\" rel=\"stylesheet\">" +
        "<script src=\"//use.typekit.net/fjj0nzz.js\"></script>" +
        "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>" +
        "<script>try{Typekit.load();}catch(e){}</script>" +
        "<title>" + content.state.title + "</title>" +
      "</head>" +
      "<body>" +
        "<div id=\"app\">" + content.body + "</div>" +
      "</body>" +
      "<script src=\"/bundle.js\"></script>" +
      "<script src=\"//cdn.optimizely.com/js/3135500165.js\"></script>" +
      "<script type=\"text/javascript\">" +
        "app.load(" + JSON.stringify(content.state) + ")" +
      "</script>" +
    "</html>";
  }

  var _cache = {};

  server.use(function(req, res, next) {

    var path = req.path;
    var json = false;

    if (_cache[path]) {
      return res.send(_cache[path]);
    }

    if (json = !!~path.indexOf(".json")) {
      path = path.replace(".json", "");
    }

    try {
      app.router.redirect(path);
    } catch(e) {

      // 404
      return next();
    }

    var state = app.router.location.state;

    if (json) return res.send(state);

    var component = React.createElement(Body, { state: state, app: app });

    res.send(_cache[path] = html({
      body: React.renderToString(component),
      state: state
    }));
  });

  realtime(server.listen(port), app);

  glob.sync(app.config.directories.examples + "/*/server.js").forEach(function(pathname) {
    require(pathname)(app);
  });
}