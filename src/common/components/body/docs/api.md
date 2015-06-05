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


#### bus wrap(handler)

Wraps a function as a bus

<Example>
  <Script path="index.js">  
var mesh = require("mesh");
var bus = mesh.wrap(function(operation, next) {
  if (operation.returnError) {
    next(new Error("Whoops! Something went wrong"));
  } else {
    next(void 0, "some returned data");
  }
});

bus({ returnError: true }).on("error", function(error) {
  console.log("error: ", error.message);
});

bus({ }).on("data", function(data) {
  console.log("data: ", data);
});
</Script>
</Example>

#### bus stream(handler)

Passes a [stream](https://nodejs.org/api/stream.html) to target handler.

<Example>
  <Script path="index.js">  

var mesh = require("mesh");

var bus = mesh.stream(function(operation, stream) {
  stream.write({ id: "user1" });
  stream.write({ id: "user2" });
  stream.end();
});

bus({}).on("data", function(data) {
  console.log("data: ", data);
}).on("end", function() {
  console.log("END");
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

passes an operation to `bus` if `condition` is **true**.

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

passes an operation to `bus` if `condition` is **false**.

<Example>
  <Script path="index.js">
var mesh = require("mesh");

function testOperation(operation) {
  return operation.name === "doSomething";
}

var bus = mesh.reject(testOperation, mesh.wrap(function(operation, next) {
    console.log("handle doSomething op", operation);
}), mesh.wrap(function(operation) {
    console.log("handle doSomething else op", operation);
}));

bus(mesh.op("doSomething"));
bus(mesh.op("doSomethingElse"));

  </Script>
</Example>

#### bus tailable(bus[, condition])

Makes a bus tailable for operations.

<Example>
  <Script path="index.js">
var mesh = require("mesh");

var bus = mesh.wrap(function(operation, next) {
  console.log("handle operation: ", operation);
  next();
});

bus = mesh.tailable(bus, function(tail, operation) {
  return tail.query.name === operation.name;
});

bus(mesh.op("tail", { query: { name: "insert" }})).on("data", function(operation) {
  console.log("tailed operation: ", operation);
});

bus(mesh.op("load"));
bus(mesh.op("insert"));
bus(mesh.op("say hello"));

  </Script>
</Example>

#### bus parallel([busses])

Runs busses in parallel.

<Example>
  <Script path="index.js">  
var mesh = require("mesh");

var busses = [

  // executed last
  mesh.wrap(function(operation, next) {
    setTimeout(next, 1000, void 0, "end bus 1");
  }),

  // executed first
  mesh.wrap(function(operation, next) {
    setTimeout(next, 500, void 0, "end bus 2");
  })
];

var bus = mesh.parallel(busses);

bus(mesh.op("do something")).on("data", function(message) {
  console.log(message);
});

  </Script>
</Example>


#### bus sequence([busses])

Runs busses in sequence.


<Example>
  <Script path="index.js">  
var mesh = require("mesh");

var busses = [

  // executed first
  mesh.wrap(function(operation, next) {
    setTimeout(next, 1000, void 0, "end bus 1");
  }),

  // executed last
  mesh.wrap(function(operation, next) {
    setTimeout(next, 500, void 0, "end bus 2");
  })
];

var bus = mesh.sequence(busses);

bus(mesh.op("do something")).on("data", function(message) {
  console.log(message);
});

  </Script>
</Example>

#### bus fallback([busses])

Runs busses in sequence until data is emitted.

<Example>
  <Script path="index.js">  
var mesh = require("mesh");

var busses = [

  // executed first - fall through
  mesh.stream(function(operation, stream) {
    console.log("execute bus 1");
    stream.end();
  }),

  // execute second - hit!
  mesh.stream(function(operation, stream) {
    console.log("execute bus 2");
    stream.write("bus 2 data");
    stream.end("more bus 2 data");
  }),

  // never hit
  mesh.stream(function(operation, stream) {
    console.log("execute bus 3 (this shouldn't be logged)")
    stream.end();
  })
];

var bus = mesh.fallback(busses);

bus(mesh.op("do something")).on("data", function(message) {
  console.log(message);
});
</Script>
</Example>

#### bus race([busses])

Runs all busses in parallel until one bus emits data.

<Example>
  <Script path="index.js">  
var mesh = require("mesh");

var busses = [

  // executed first - fall through
  mesh.stream(function(operation, stream) {
    console.log("execute bus 1");
    setTimeout(stream.end.bind(stream), 300, "bus 1 data");
  }),

  // execute second - hit!
  mesh.stream(function(operation, stream) {
    console.log("execute bus 2");
    setTimeout(stream.end.bind(stream), 500, "more bus 2 data");
  }),

  // never hit
  mesh.stream(function(operation, stream) {
    console.log("execute bus 3");
    setTimeout(stream.end.bind(stream), 100, "bus 3 data");
  })
];

var bus = mesh.race(busses);

bus(mesh.op("do something")).on("data", function(message) {
  console.log(message);
});
</Script>
</Example>

#### bus limit(count, bus)

Limits the number of concurrent operations.

<Example>
  <Script path="index.js">  

var mesh = require("mesh");

var bus = mesh.wrap(function(operation, next) {
  console.log("handle operation", operation);
  setTimeout(next, Math.random() * 500, "data");
});

// limit to only one operation at a time
bus = mesh.limit(1, bus);

bus({ name: "insert" });
bus({ name: "load" });
bus({ name: "remove" });

</Script>
</Example>


#### bus map(bus, map)

Maps data

<Example>
  <Script path="index.js">  

var mesh = require("mesh");

var bus = mesh.wrap(function(operation, next) {
  console.log("handle operation: ", operation);
  next(void 0, operation.spell);
});


bus = mesh.map(bus, function(operation, data, stream) {
  console.log("map: ", operation, data);
  data.split("").forEach(function(character) {
    stream.write(character);
  });
  stream.end();
});

bus({ spell: "hello" }).on("data", function(character) {
  console.log("data: ", character);
});

</Script>
</Example>

#### bus reduce(bus, reduce)

Reduces data from `bus` into one chunk.

<Example>
  <Script path="index.js">  

var mesh = require("mesh");

var bus = mesh.stream(function(operation, stream) {
  stream.write("hello");
  stream.write("big");
  stream.end("world");
});


bus = mesh.reduce(bus, function(operation, prev, current) {
  return [].concat(prev, current).join(" ");
});

bus({ }).on("data", function(message) {
  console.log("data: ", message);
});

</Script>
</Example>

#### bus catchError(bus, handler)

Catches an error emitted by a bus

<Example>
  <Script path="index.js">  

var mesh = require("mesh");

var bus = mesh.wrap(function(operation, next) {
  next(new Error("Whoops, something went wrong!"));
});

bus = mesh.catchError(bus, function(error) {
  console.log("caught error: ", error.message);
});

bus({ name: "some command" }).on("error", function(error) {
  console.log("emitted error: ", error.message);
});

</Script>
</Example>

#### bus yields(error, data)

Yields data. Useful for testing.

<Example>
  <Script path="index.js">  
var mesh = require("mesh");

var bus = mesh.yields(void 0, ["chunk 1", "chunk 2"]);

bus({ name: "do something"}).on("data", function(data) {
  console.log("data: ", data);
}).on("end", function() {
  console.log("end operation");
});
  </Script>
</Example>



#### bus noop

No operation bus


<Example>
  <Script path="index.js">  

var mesh    = require("mesh");
var memoize = require("memoizee");

var bus = mesh.noop;

bus({ name: "some command" }).on("data", function(data) {
  console.log("data - shouldn't be logged!");
}).on("end", function() {
  console.log("no operation ended");
});

  </Script>
</Example>

#### bus wait(waitFn, bus)

Waits for `waitFn` to execute before passing operations to `bus`.


<Example>
  <Script path="index.js">  

var mesh    = require("mesh@2.0.3");
var extend  = require("extend");
var sift    = require("sift");
var _       = require("highland");
var memoize = require("memoizee");

// fake data
var fixtures = {
  chains: [
    {
      id: "chain1",
      nextChainId: "chain2"
    },
    {
      id: "chain2",
      nextChainId: "chain3"
    },
    {
      id: "chain3",
      nextChainId: "chain4"
    },
    {
      id: "chain4"
    }
  ]
};

// fake data source handler
var bus = mesh.accept("load", mesh.wrap(function(operation, next) {
  console.log("handle operation: ", operation);

  var foundItems = sift(operation.query, fixtures[operation.collection]);
  if (!foundItems.length) return next(new Error("not found"));

  // simulate network latency
  setTimeout(next, 500, void 0, foundItems[0]);
}));

/**
 * Base model
 */

function Base(properties) {
  extend(this, properties);

  // memoize load so it can only be called once
  var load = memoize(this.reload.bind(this), {
    async: true
  });

  // set the load function and return self
  this.load = function(onLoad) {
    load(onLoad);
    return this;
  }
}

/**
 */

extend(Base.prototype, {

  /**
   * reloads the model from a data source
   */

  reload: function(onLoad) {
    if (!onLoad) onLoad = function() { };
    this
    .bus({ name: "load" })
    .on("data", this.onData.bind(this))
    .once("error", onLoad)
    .once("end", onLoad.bind(this, void 0, this));
  },

  /**
   * set data from the data source as properties
   * of this model
   */

  onData: function(data) {
    extend(this, data);
  }
});

/**
 * Chain model example demonstrating how you
 * can asynchronously load resources without callbacks
 */

function Chain(properties) {
  Base.call(this, properties);
}

/**
 * extend the base model
 */

extend(Chain.prototype, Base.prototype, {

  /**
   * Get the next chain model
   */

  getNext: function(onLoad) {

     // return the next chain model immediately, but
     // wait until THIS model has loaded.
     return new Chain({

      // wait for this model to load, then attach the proper
      // query params to the operation so that this model
      // can load itself
      bus: mesh.wait(this.load, mesh.attach(function() {
        return {
          query: { id: this.nextChainId }
        };
      }.bind(this), this.bus))
    }).load(onLoad);
  }
});

// setup the new chain & attach default props that load
// this chain in
var chain = new Chain({
  bus : mesh.attach({ collection: "chains", query: { id: "chain1" } }, bus)
});

function onChainLoad(err, chain) {
  if (err) {
    console.log("error: ", err.message);
  } else {
    console.log("loaded chain: ", chain);
  }
}

// synchronously get a bunch of chains
chain
.load(onChainLoad)
.getNext(onChainLoad)
.getNext(onChainLoad)
.getNext(onChainLoad)
.getNext(onChainLoad);


  </Script>
</Example>

#### bus timeout(ms, bus)

#### bus retry(count, bus)
