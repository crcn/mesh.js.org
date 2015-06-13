var mesh    = require("mesh");
var storage = require("mesh-memory");
var io      = require("mesh-socket.io");

// storage. This can be anything- mongodb, memory, etc.
var bus = storage();

// allows the app to receive all operations executed on DB.
bus = mesh.tailable(bus);

// make the bus realtime with socket.io
bus = mesh.parallel(bus, io({ channel: "operation" }, bus));

// tail for all local & remote operations
bus(mesh.op("tail"))
.on("data", function(data) {
  console.log("new message: ", data);
});

bus({
  name: "insert",
  collection: "messages",
  data: {
    text: prompt("Type a message!")
  }
});
