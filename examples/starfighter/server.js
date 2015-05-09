var Space     = require("./models/space");
var createBus = require("./bus/server");

module.exports = function(app) {

  var bus = createBus(app);

  var space = Space({
    bus: bus
  });

  setInterval(function() {

    bus({ name: "tick" });
    space.tick();
  }, 1000/30);
}
