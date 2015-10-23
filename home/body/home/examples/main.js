import { ParallelBus } from "mesh";
import { MeshLocalStorageDbBus } from "mesh-local-storage-db-bus";
import { MeshSocketIoBus } from "mesh-socket-io-bus";

// use any one of these database adapters. They all handle
// the same CRUD operations
// var storage = require("mesh-memory");
// var storage = require("mesh-loki");
var storageBus = MeshLocalStorageDbBus.create();

// persist all operations to socket.io & any operations from socket.io
// back to local storage.
var mainBus = ParallelBus.create([
  storageBus,
  MeshSocketIoBus.create({ channel: "operations" }, storageBus)
]);

// insert data. Persists to local storage, and gets
// broadcasted to all connected clients.
mainBus.execute({
  action : "insert",
  collection : "messages"
  data : { text: "hello world" }
});
