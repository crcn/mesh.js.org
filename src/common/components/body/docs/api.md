#### operation op(name[, operation])

Creates a new operation

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
  </Script>
</Example>

#### bus attach(properties, bus)

#### bus accept(conditon, bus[, ebus])

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
