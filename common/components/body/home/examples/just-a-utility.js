var mesh = require("mesh");

var sayHelloBus = mesh.stream(function(operation, stream) {
  stream.end({
    text: "Hello " + operation.name
  });
});

sayHelloBus({ name: "Ron Burgundy" }).on("data", function(data) {
  console.log(data.text); // Hello Ron Burgundy
});
