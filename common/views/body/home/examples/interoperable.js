var mesh   = require("mesh");
var memory = require("mesh-memory");
var io     = require("mesh-socket.io");

var bus = mesh.stream(function(operation, stream) {
  console.log("op ", operation);
  stream.end({
    text: "Hello " + operation.name
  });
});

bus = mesh.tailable(bus);

bus(mesh.op("tail")).on("data", io({ channel: "interop-example" }, bus));

bus({ name: prompt("What's your name?") }).on("data", function(data) {
  console.log(data.text);
});
