#### operation op(name[, operation])

Creates a new operation. This method is equivalent to `{ name: "operation" }`.

<Example>
  <Script path="index.js">
var mesh = require("mesh");

var bus = mesh.wrap(function(operation, next) {
  console.log(operation);
  next();
});

bus(mesh.op("doSomething")).on("end", function() {
  console.log("ended");
});

// or use a vanilla object
bus({ name: "doSomething" }).on("end", function() {
  console.log("endeded vanilla object");
});
  </Script>
</Example>

#### bus attach(props, bus)

Adds properties to a running `operation`. `props` can be a `function`, or an `object`.


<Example>
  <Script path="index.js">
var mesh = require("mesh");

var bus = mesh.wrap(function(operation, next) {
  console.log("handled operation: ", operation);
  next();
});

bus = mesh.attach(function(operation) {
  if (operation.model) return {
    query: { id: operation.model.id }
  }
}, bus);

function User(id) {
  this.id = id;
}

bus(mesh.op("load", { model: new User("user1") }));
  </Script>
</Example>


#### bus accept(conditon, bus[, ebus])

passes an operation to `bus` if `condition` is true.

<Example>
  <Script path="index.js">
var mesh = require("mesh");

function testOperation(operation) {
  return operation.name === "doSomething";
}

var bus = mesh.accept(testOperation, mesh.wrap(function(operation, next) {
    console.log("handle doSomething op", operation);
}), mesh.wrap(function(operation) {
    console.log("handle doSomething else op", operation);
}));

bus(mesh.op("doSomething"));
bus(mesh.op("doSomethingElse"));

  </Script>
</Example>

#### bus reject(condition, bus[, ebus])

#### bus stream.tailable(bus)

#### bus parallel([busses])

#### bus sequence([busses])

#### bus fallback([busses])

#### bus race([busses])

#### bus wrap(callback)

#### bus stream(callback)

#### bus limit(count, bus)

#### bus map(bus, map)

#### bus reduce(bus, reduce)

#### bus catchError(bus, handler)

#### bus noop
