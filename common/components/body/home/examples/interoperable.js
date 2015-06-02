var mesh   = require("mesh");
var io     = require("mesh-socket.io");

var bus = mesh.stream(function(operation, stream) {
  console.log("handle ", operation);
  stream.end({
    text: "Hello " + operation.name
  });
});

bus = mesh.tailable(bus);

bus(mesh.op("tail")).on("data", io({ channel: "operation" }, bus));

bus({ name: prompt("What's your name?") }).on("data", function(data) {
  console.log(data.text);
});
