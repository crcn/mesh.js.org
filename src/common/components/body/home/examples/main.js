var mesh         = require("mesh");
var localStorage = require("mesh-local-storage");
var io           = require("mesh-socket.io");

var bus = localStorage();
bus     = mesh.tailable(bus);

// persist all operations to socket.io & any operations from socket.io
// back to the local bus. (Note that remote operations will get ignored)
bus({ name: "tail" }).pipe(mesh.open(io({ channel: "operations" }, bus)));

// insert data. Persists to local storage, and gets
// broadcasted to all connected clients.
bus({
  name : "insert",
  collection : "messages"
  data : { text: "hello world" }
});
