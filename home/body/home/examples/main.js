var mesh             = require("mesh");
var createStorageBus = require("mesh-local-storage");

// use any one of these database adapters. They all handle
// the same CRUD operations
// var storage = require("mesh-memory");
// var storage = require("mesh-loki");
var createRealtimeBus = require("mesh-socket.io");

var storageBus = createStorageBus();

// persist all operations to socket.io & any operations from socket.io
// back to local storage.
var mergedBus = mesh.parallel(
  storageBus,
  createRealtimeBus({ channel: "operations" }, storageBus)
);

// insert data. Persists to local storage, and gets
// broadcasted to all connected clients.
mergedBus({
  name : "insert",
  collection : "messages"
  data : { text: "hello world" }
});
