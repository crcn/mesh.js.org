var express    = require("express");
var Body       = require("../../common/views/body");
var browserify = require("browserify-middleware");
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
  server.use("/bundle.js", browserify(path.join(__dirname, "../../browser/index.js"), {
    extensions: [".jsx"],
    debug: prod,
    cache: prod,
    precompile: prod,
    minify: prod,
    gzip: true,
    transform: ["reactify", "brfs"]
  }));

  less(app, server);

  function html(content) {
    return "<html>" +
      "<head>" +
        "<link href=\"/vendor/bootstrap/css/bootstrap.min.css\" rel=\"stylesheet\">" +
        "<link href=\"/bundle.css\" rel=\"stylesheet\">" +
        "<link href=\"http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css\" rel=\"stylesheet\">" +
        "<script src=\"//use.typekit.net/fjj0nzz.js\"></script>" +
        "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>" +
        "<script>try{Typekit.load();}catch(e){}</script>" +
      "</head>" +
      "<body>" +
        "<div id=\"app\">" + content.body + "</div>" +
      "</body>" +
      "<script type=\"text/javascript\" src=\"/bundle.js\"></script>" +
      "<script type=\"text/javascript\">" +
        "app.load(" + JSON.stringify(content.attrs) + ")" +
      "</script>" +
    "</html>";
  }

  server.use(function(req, res, next) {
    mesh.run(app.bus, req.path, {}, function(err, attrs) {
      if (!attrs) return next();
      var component = React.createElement(Body, attrs);
      res.send(html({
        body: React.renderToString(component),
        attrs: attrs
      }));
    });
  });

  realtime(server.listen(port), app);

  glob.sync(app.config.directories.examples + "/*/server.js").forEach(function(pathname) {
    require(pathname)(app);
  });
}
