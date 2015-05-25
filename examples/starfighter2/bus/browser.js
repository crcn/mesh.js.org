var mio      = require("mesh-socket.io");
var mesh     = require("mesh");
var tailable = require("./tailable");

module.exports = function(app) {
  if (!process.browser) return mesh.noop;
  var bus = mesh.noop;
  bus = tailable(bus);
  bus(mesh.op("tail")).on("data", function(op) {
    console.log(op);
  });
  bus = mesh.reject("tail", mesh.limit(1, mio({}, bus)), bus);
  return bus;
};
