Just some random thoughts about how the starfighter bus should be implemented. This is kind of a not-so-easy thing to implement since it requires synchronizing state between multiple clients where the only values synchronized are velocity, and rotation. Position of each element needs to be calculated on each client since that's the optimial approach, and somewhere else there needs to be collision detection. Ideally there'd be a server which controls all that.

So, perhaps a master/slave approach, where slaves take in commands, relay them to the master (which does all the calculations), then passes that change onto the child busses.


```javascript
var bus = require("./starfighterBus");
var master = bus();


var slave1 = bus(master);
var slave2 = bus(master);

// tail would come from the MASTER
slave1(mesh.op("tail")).on("data", function(operation) {

});

// hits master - tail gets executed from master result
slave1(mesh.op("update", {
  query: { cid: "cid1" },
  data: { x: 100 }
}));

// reach server last, and but has earlier timestamp than
// first up. Gets ignored.
slave(mesh.op("update", {
  query: { cid: "cid1" },
  data: { x: 100 }
}))

```
