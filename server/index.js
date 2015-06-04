var Application = require("./application");
var caplet      = require("caplet");
var path        = require("path");

var app = new Application({
  config: new caplet.Model({
    directories: {
      static   : path.join(__dirname, "../static"),
      browser  : path.join(__dirname, "../browser"),
      server   : path.join(__dirname, "../server"),
      common   : path.join(__dirname, "../common"),
      examples : path.join(__dirname, "../examples")
    },
    http: {
      port: process.env.PORT || 8081
    }
  })
});

app.load();
