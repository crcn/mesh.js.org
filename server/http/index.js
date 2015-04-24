var express    = require("express");
var Body       = require("../../common/views/body");
var browserify = require("browserify-middleware");
var React      = require("react");
var path       = require("path");

module.exports = function(config) {

  var server = express();
  var port   = config.get("http.port");

  console.log("listening on port %d", port);

  server.use(express.static(config.get("directories.static")));
  server.use("/bundle.js", browserify(path.join(__dirname, "../../index.js"), {
    extensions: [".jsx"],
    debug: false,
    transform: "reactify"
  }));

  function html(content) {
    return "<html>" +
      "<head>" +
      "</head>" +
      "<body>" +
        "<div id=\"app\">" + content.body + "</div>" +
      "</body>" +
      "<script type=\"text/javascript\" src=\"/bundle.js\"></script>" +
    "</html>";
  }

  server.use(function(req, res) {
    var component = React.createElement(Body);
    res.send(html({
      body: React.renderToString(component)
    }));
  });

  server.listen(port);
}
