var mesh = require("mesh");

module.exports = create();
var _id = 0;

function create() {

  var bus = mesh.wrap(function(operation, next) {
    next(void 0, operation.data);
  });
  bus     = tailable(bus);
  bus     = attachModelData(bus);

  return bus;
}

function tailable(bus) {
  return mesh.tailable(bus, function(a, b) {
    return a.collection === b.collection;
  });
}

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


function createId() {
  return Date.now() + "." + (_id++);
}
