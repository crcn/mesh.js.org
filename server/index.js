var Application = require("./application");
var caplet      = require("caplet");
var path        = require("path");

var app = new Application({
  config: new caplet.Model({
    directories: {
      static: path.join(__dirname, "../static")
    },
    http: {
      port: process.env.PORT || 8081
    }
  })
});



app.load();
