var Application = require("./application");
var caplet      = require("caplet");

var app = new Application();

global.app = app;

// render before loading scripts
setTimeout(function() {
  require("./analytics");
}, 1);
