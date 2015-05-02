var mesh = require("mesh");
var sift = require("sift");
var mio  = require("mesh-socket.io");

module.exports = function(bus) {
  bus = clients(bus);
  return bus;
};

/**
 */

function clients(bus) {

  var clients = [];

  return mesh.parallel(

    // internal - adds a remote client to the mix
    mesh.accept("addClient", mesh.wrap(function(operation, next) {
      var client = operation.client;

      // setup the remote client
      var c = mio({ client: client }, bus);

      clients.push(c);
      client.once("disconnect", function() {
        clients.splice(clients.indexOf(c), 1);
      });
      next(void 0, true);
    })),

    // push updates back to the clients - don't wait for a response
    mesh.accept("update", mesh.attach({ resp: !process.browser }, mesh.parallel(clients))),

    bus
  )
}

/**
 */
