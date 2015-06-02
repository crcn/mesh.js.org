var Application = require("./application");
var caplet      = require("caplet");
var path        = require("path");

var rootDirectory = path.normalize(__dirname + "/../../");
var srcDirectory  = path.normalize(__dirname + "/../");


var app = new Application({
  config: new caplet.Model({
    directories: {
      static: path.join(rootDirectory, "static"),
      browser: path.join(srcDirectory, "browser"),
      server: path.join(srcDirectory, "server"),
      common: path.join(srcDirectory, "common"),
      examples: path.join(srcDirectory, "examples")
    },
    http: {
      port: process.env.PORT || 8081
    }
  })
});

app.load();
