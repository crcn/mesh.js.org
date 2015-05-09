var Space     = require("./models/space");
var Timer     = require("./models/timer");
var Ticker    = require("./models/ticker");
var createBus = require("./bus/server");

module.exports = function(app) {

  var bus = createBus(app);

  var space = Space({
    bus: bus
  });

  new Ticker({
    bus: bus,
    target: space
  });

  new Timer({
    bus: bus,
    fps: 30
  }).start();
};
