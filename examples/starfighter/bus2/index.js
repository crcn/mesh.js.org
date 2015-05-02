var mesh = require("mesh");
var io   = require("mesh-socket.io");
var sift = require("sift");
var diff = require("object-diff");

module.exports = create;

/**
 */

function create(bus) {

  if (!bus) {
    bus = mesh.wrap(function(operation, next) {
      next(void 0, operation.data);
    });
  }

  if (process.browser) {
    bus = tailable(bus);
  }

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
      var tester = sift(a.query);
      matches = matches && (tester(b.data) || tester(b.query));
    }

    return matches;
  });
}

/**
 */

function realtime(bus) {
  bus(mesh.op("tail")).pipe(mesh.open(io("starfighter", bus)));
  return bus;
}
