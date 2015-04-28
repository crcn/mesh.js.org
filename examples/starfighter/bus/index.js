var mesh = require("mesh");
var io   = require("mesh-socket.io");
var sift = require("sift");

module.exports = create();

/**
 */

function create() {

  var bus = mesh.wrap(function(operation, next) {
    next(void 0, operation.data);
  });

  bus = tailable(bus);

  if (process.browser) {
    bus = realtime(bus);
  }

  return bus;
}

/**
 */

function tailable(bus) {
  return mesh.tailable(bus, function(a, b) {

    var matches = !a.collection;
    matches     = matches || (a.collection === b.collection);

    if (a.query) {
      var d = b.data || (b.model ? m.model.toData() : void 0);
      matches = matches && sift(a.query)(d);
    }

    return matches;
  });
}

/**
 */

function realtime(bus) {

  var rtBus = mesh.attach({ model: void 0 }, io("starfighter", bus));

  bus(mesh.op("tail")).pipe(mesh.open(rtBus));
  return bus;
}
