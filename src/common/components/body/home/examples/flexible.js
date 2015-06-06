var mesh = require("mesh");
var sift = require("sift");
var http = require("mesh-http");

var bus = http({ prefix: "/api" });

bus = mesh.accept(
  sift({ collection: "users", name: "insert" }),
  mesh.attach(function(operation) {
    return {
      pathname: "/createUser",
      method: "POST"
      data: operation.data
    }
  }, bus)
);

var user = new UserModel({
  name: "Billy",
  bus: mesh.attach({ collection: "users" }, bus)
});

// POST /api/createUser { name: "Billy" }
user.insert(function() { });
