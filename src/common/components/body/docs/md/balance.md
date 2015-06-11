Various load balancing algorithms.

Installation: `npm install mesh-balance --save`

#### bus rotate(workers)

Rotates the busses. Round-robin style.

<Example>
```javascript
///index.js
var mesh    = require("mesh");
var balance = require("mesh-balance");

var busses = Array.apply(void 0, new Array(10)).map(function(v, i) {
  return mesh.wrap(function(operation, next) {
    console.log("op handler " + i + ":", operation);
    next();
  });
});

var bus = mesh.limit(1, balance.rotate(busses));

for (var i = 10; i--;) bus({ name: "doSomething" });
```
</Example>

#### bus least(workers)

Runs operations against the bus with the fewest running operations.

<Example>
```javascript
///index.js
var mesh    = require("mesh");
var balance = require("mesh-balance");

var busses = Array.apply(void 0, new Array(10)).map(function(v, i) {
  return mesh.wrap(function(operation, next) {
    console.log("op handler " + i + ":", operation);
    setTimeout(next, 20);
  });
});

var bus = mesh.limit(2, balance.least(busses));

for (var i = 10; i--;) bus({ name: "doSomething" });
```
</Example>

#### bus random(workers)

Runs operations against a random bus.

<Example>
```javascript
///index.js
var mesh    = require("mesh");
var balance = require("mesh-balance");

var busses = Array.apply(void 0, new Array(10)).map(function(v, i) {
  return mesh.wrap(function(operation, next) {
    console.log("op handler " + i + ":", operation);
    next();
  });
});

var bus = mesh.limit(1, balance.random(busses));

for (var i = 10; i--;) bus({ name: "doSomething" });
```
</Example>
