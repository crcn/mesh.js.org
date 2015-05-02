var Space  = require("./models/space");
var mesh   = require("mesh");
var memory = require("mesh-memory");

module.exports = function(app) {

  app.ioserver.on("connection", function(client) {
    console.log("D");
  });


  var space = Space({
    bus: app.bus
  });

  setInterval(function() {
    space.tick();
  }, 1000/30);
}
