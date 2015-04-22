var Application = require("./application");

var app = new Application({
  config: {
    http: {
      port: process.env.PORT || 8080
    }
  }
});

app.load();
