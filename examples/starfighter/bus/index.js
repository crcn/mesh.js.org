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
  bus = attachModelData(bus);

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
      matches = matches && sift(a.query)(b.data || (b.model ? m.model.toData() : void 0));
    }

    return matches;
  });
}

/**
 */

function attachModelData(bus) {
  return mesh.attach(function(operation) {
    if (!operation.model) return;

    var data = operation.model.toData();

    if (operation.name === "insert") {
      data.cid       = createId();
      data.timestamp = Date.now();
    }
    return {
      data: data
    }
  }, bus);
}

/**
 */

function realtime(bus) {

  var rtBus = mesh.attach({ model: void 0 }, io("starfighter", bus));

  bus(mesh.op("tail")).pipe(mesh.open(rtBus));
  return bus;
}

/**
 */

var _id = 0;

function createId() {
  return Date.now() + "." + (_id++);
}
