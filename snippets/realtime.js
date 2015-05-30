var mesh   = require("mesh");
var io     = require("mesh-socket.io");
var memory = require("mesh-memory");

// setup the in-memory database
var bus = mesh.tailable(memory());

// make it realtime
bus     = io({
  channel: "operations"
}, bus);

bus(mesh.op("tail")).on("data", function(operation) {
  console.log("tailed op: ", operation);
});

exports.addMessage = function(text) {
  bus(mesh.op("insert", {
    collection: "messages",
    data: { text: text }
  }));
};
