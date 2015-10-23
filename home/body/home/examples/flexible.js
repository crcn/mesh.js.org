var mesh = require("mesh");
var sift = require("sift");
var http = require("mesh-http");

var bus = http();

// map CRUD operation to proper API request
bus = mesh.accept(

  // mongodb query utility for operations
  sift({ name: "insert", collection: "users" }),

  // attach these properties to a running op
  mesh.attach({ url: "/register", method: "POST" }, bus),

  // else bus if sift() fails
  bus
);

// POST /register { name: "blarg" }
bus({ collection: "users", name: "insert", data: { name: "blarg" } });
