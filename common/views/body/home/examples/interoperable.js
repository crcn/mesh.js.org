var mesh   = requir("mesh");
var memory = require("mesh-memory");
var io     = require("mesh-socket.io");

var bus = mesh.stream(function(operation, stream) {
  stream.end({
    text: "Hello " + operation.name
  });
});

// make the bus tailable for all operations
bus = mesh.tailable(sayHelloBus);

// tail operations on the local bus, pass them to socket.io, and redirect all remote
// ops back to the local bus
bus(mesh.op("tail")).on("data", io({ channel: "operations" }, bus));


bus({ name: prompt("What's your name?") }).on("data", function(data) {
  console.log("Hello " + data.name);
});
