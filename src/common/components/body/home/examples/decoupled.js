var mesh    = require("mesh");
var extend  = require("extend");
// var mongo   = require("mesh-mongodb");
// var memory  = require("mesh-memory");
var loki    = require("mesh-loki");

// var bus = memory();
// var bus = mongo({ host: "mongodb://127.0.0.1:27017/database" });
var bus = loki();

bus({
  name: "insert",
  collection: "messages",
  data: { name: "Hello World" }
}).on("data", function(data) {
  console.log(data);
});
