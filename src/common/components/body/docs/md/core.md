These docs assume that you're familiar with [node streams](https://github.com/substack/stream-handbook).


#### stream bus(operation)

Executes an operation where `bus` is the `operation` handler. A node-like [stream](https://nodejs.org/api/stream.html) is returned that emits data handled by the `bus`.

#### operation op(name[, properties])

Creates a new operation. This function is equivalent to `{ name: "operation" }`.


<Tabs>
  <Example title="simple">
    ```javascript  
      ///index.js
      var mesh   = require("mesh@4.0.6");
      var stream = require("obj-stream");

      // create a simple, vanilla bus
      var bus = function(operation) {
        var s = new stream.Stream();
        console.log("handle operation", operation);
        setTimeout(function() {
          s.end();
        }, 0);
        return s;
      }

      // execute an operation
      bus(mesh.op("doSomething")).on("end", function() {
        console.log("ended");
      });
    ```
  </Example>
  <Example title="vanilla object">
    ```javascript
      ///index.js
      var mesh = require("mesh@4.0.6");

      // use wrap utility so we don't have to create an object
      // stream
      var bus = mesh.wrap(function(operation, next) {
        console.log(operation);
        next();
      });

      // or use a vanilla object
      bus({ name: "doSomething" }).on("end", function() {
        console.log("endeded vanilla object");
      });
    ```
  </Example>
</Tabs>


#### bus wrap(handler)

Wraps a function as a bus.


<Tabs>
  <Example title="success handling">
    ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");
    var bus = mesh.wrap(function(operation, next) {
        next(void 0, "some returned data");
    });

    bus({}).on("data", function(data) {
      console.log("data: ", data);
    });
    ```
  </Example>
  <Example title="error handling">
    ```javascript
    ///index.js

    var mesh = require("mesh@4.0.6");
    var bus = mesh.wrap(function(operation, next) {
        next(new Error("Whoops! Something went wrong"));
    });

    bus({}).on("error", function(error) {
      console.error(error.message);
    });
    ```
  </Example>
</Tabs>

#### bus stream(handler)

Passes a [stream](https://nodejs.org/api/stream.html) to the target `handler`.

<Example>
  ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");
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
  ```
</Example>

#### bus attach(props, bus)

Overrides properties on a running operation.


<Tabs>
  <Example title="props as function">
    ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");

    var bus = mesh.wrap(function(operation, next) {
      console.log("handled operation: ", operation);
      next();
    });

    bus = mesh.attach(function(operation) {
      return {
        path: "/users/" + operation.query.id
      }
    }, bus);

    bus(mesh.op("load", { query: { id: "userId" } }));
    ```
  </Example>
  <Example title="props as object">
    ```javascript
    ///index.js

    var mesh = require("mesh@4.0.6");

    var bus = mesh.wrap(function(operation, next) {
      console.log("handled operation: ", operation);
      next();
    });

    bus = mesh.attach({ collection: "users" }, bus);


    bus(mesh.op("load", { query: { id: "user1" }}));
    ```
  </Example>
</Tabs>

#### bus defaults(props, bus)

Sets default properties on an operation if they don't exist.

#### bus accept(conditon, bus[, ebus])

Passes an operation to `bus` if `condition` is **true**.

<Tabs>
  <Example title="accept with tester">
    ```javascript
      ///index.js
      var mesh = require("mesh@4.0.6");

      function testOperation(operation) {
        return operation.name === "something";
      }

      var bus = mesh.accept(testOperation, mesh.wrap(function(operation, next) {
        console.log("handle operation: ", operation);
        next(void 0, { text: "Hello" });
      }));

      bus(mesh.op("something")).on("data", function(data) {
        console.log("response data: ", data);
      }).on("end", function() {
        console.log("something operation ended");
      });

      bus(mesh.op("rejected")).on("data", function(data) {

        // this should not be logged
        console.log("response data: ", data);
      }).on("end", function() {
        console.log("rejected operation ended");
      });
    ```
  </Example>
  <Example title="else bus">
    ```javascript
      ///index.js

      var mesh = require("mesh@4.0.6");

      var bus = mesh.wrap(function(operation, next) {
          console.log("handle doSomething op", operation);
          next();
      });

      // accept also allows operation names
      var bus = mesh.accept("doSomething", bus, mesh.wrap(function(operation) {
          console.log("handle doSomething else op", operation);
      }));

      bus(mesh.op("doSomething"));
      bus(mesh.op("doSomethingElse"));

      ```
  </Example>
  <Example title="simple command handler">
    ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");
    var sift = require("sift");

    function command(query, handler) {
      return mesh.accept(sift(query), mesh.wrap(handler));
    }

    var commands = [
      command({ name: "insert" }, function(operation, next) {
        console.log("handle insert", operation);
        next(void 0, true);
      }),
      command({ name: "remove" }, function(operation, next) {
        console.log("handle remove", operation);
        next(void 0, true);
      }),
      command({ name: "load", multi: true }, function(operation, next) {
        console.log("handle load multiple", operation);
        next(void 0, true);
      }),
      command({ name: "load" }, function(operation, next) {
        console.log("handle load single item", operation);
        next(void 0, true);
      })
    ];

    var bus = mesh.fallback(commands);

    bus(mesh.op("insert"));
    bus(mesh.op("remove"));
    bus(mesh.op("load"));
    bus(mesh.op("load", { multi: true }));
    ```
  </Example>
</Tabs>

#### bus reject(condition, bus[, ebus])

Similar to `accept` but rejects operations that are **true** in the condition.

#### bus tailable(bus[, condition])

Makes a bus tailable for operations. This is a useful function is you're looking to synchronize data in multiple places within your application.

<Tabs>
  <Example title="simple">
    ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");

    var bus = mesh.wrap(function(operation, next) {
      console.log("handle operation: ", operation);
      next();
    });

    bus = mesh.tailable(bus);

    bus(mesh.op("tail")).on("data", function(operation) {
      console.log("tailed operation: ", operation);
    });

    bus(mesh.op("load"));
    bus(mesh.op("insert"));
    bus(mesh.op("say hello"));

    ```
  </Example>
  <Example title="with condition">
    ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");

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
    ```
  </Example>
  <Example title="realtime demo">
    ```javascript
    ///index.js
    var mesh   = require("mesh@4.0.6");
    var io     = require("mesh-socket.io");

    var bus = mesh.stream(function(operation, stream) {
      console.log("handle ", operation);
      stream.end({
        text: "Hello " + operation.name
      });
    });

    bus = mesh.tailable(bus);

    bus(mesh.op("tail")).pipe(mesh.open(io({ channel: "operation" }, bus)));

    bus({ name: prompt("What's your name?") }).on("data", function(data) {
      console.log(data.text);
    });
    ```
  </Example>
  <Example title="sync data">
    ```javascript
    ///index.js
    var mesh   = require("mesh@4.0.6");
    var memory = require("mesh-memory");
    var sift   = require("sift");
    var extend = require("extend");

    var bus = memory();
    bus     = mesh.tailable(bus, function(tail, operation) {
      // use sift to enable mongodb-like queries
      return sift(tail.query)(operation);
    });

    // limit the number of ops. Skip tail since it's left open
    bus     = mesh.reject("tail", mesh.limit(1, bus), bus);

    function Person(properties) {
      this.setProperties(properties);

      // tail for any updates on this model
      this._tail = this.bus({ name: "tail", query: {
        name: "update",
        data: { id: this.id }
      }}).on("data", function(operation) {
        this.setProperties(operation.data);
      }.bind(this));
    }

    extend(Person.prototype, {
      insert: function() {
        return this.bus({ name: "insert", data: this.toJSON() });
      },
      update: function() {
        return this.bus({ name: "update", data: this.toJSON() });
      },
      load: function() {
        return this.bus({ name: "load", query: {
          id: this.id
        }}).on("data", this.setProperties.bind(this));
      },
      setProperties: function(data) {
        extend(this, data);
      },
      toJSON: function() {
        return {
          id   : this.id,
          name : this.name
        }
      },
      dispose: function() {
        this._tail.end(); // stop watching the tail
      }
    });

    var pbus = mesh.attach({ collection: "people" }, bus);

    var p1 = new Person({ id: 1, name: "Jeff", bus: pbus })
    var p2 = new Person({ id: 1, bus: pbus });
    var p3 = new Person({ id: 1, bus: pbus })

    p1.insert();
    p2.load();

    p3.load().once("end", function() {
      console.log("loaded people:");
      console.log("p1:  ", p1);
      console.log("p2: ", p2);
      console.log("p3: ", p3);
    });

    p3.name = "Joe";
    p3.update().once("end", function() {
      console.log("updated people:");
      console.log("p1:  ", p1);
      console.log("p2: ", p2);
      console.log("p3: ", p3);
    });
    ```
  </Example>
</Tabs>

#### stream mesh.open(bus)

Opens up a bus for operations to be written to.

<Example>
```javascript
///index.js
var mesh = require("mesh@4.0.6");

var bus = mesh.stream(function(operation, stream) {
  console.log("handle operation: ", operation);
  stream.write("data");
  stream.write("blah");
  stream.end();
});

var opStream = mesh.open(bus);

opStream.on("data", function(data) {
  console.log("chunk ", data);
});

opStream.write(mesh.op("insert"));
opStream.write(mesh.op("someCommand"));
```
</Example>

#### bus parallel([busses])

Runs operations against any number of busses in parallel, and merges their responses into one stream.

<Example>
  ```javascript
  ///index.js
  var mesh = require("mesh@4.0.6");

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
  ```
</Example>


#### bus sequence([busses])

Similar to `parallel`, but executes operations against any number of busses in sequence. I.e: each listed bus waits for the previous bus to `end` before executing operations.


<Example>
  ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");

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
  ```
</Example>

#### bus fallback([busses])

Runs busses in sequence until data is emitted.

<Example>
  ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");

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
  ```
</Example>

#### bus race([busses])

Runs all busses in parallel until one bus emits data.

<Example>
  ```javascript
    ///index.js
    var mesh = require("mesh@4.0.6");

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
  ```
</Example>

#### bus limit(count, bus)

Limits the number of concurrent operations.

<Example>
  ```javascript  
    ///index.js
    var mesh = require("mesh@4.0.6");

    var bus = mesh.wrap(function(operation, next) {
      console.log("handle operation", operation);
      setTimeout(next, Math.random() * 500, "data");
    });

    // limit to only one operation at a time
    bus = mesh.limit(1, bus);

    bus({ name: "insert" });
    bus({ name: "load" });
    bus({ name: "remove" });
  ```
</Example>


#### bus map(bus, map)

Maps data.

<Example>
  ```javascript
  ///index.js

  var mesh = require("mesh@4.0.6");

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
  ```

</Example>

#### bus reduce(bus, reduce)

Reduces data from `bus` into one chunk.

<Example>
  ```javascript
  ///index.js
  var mesh = require("mesh@4.0.6");

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
  ```
</Example>

#### bus catchError(bus, handler)

Catches an error emitted by a bus.

<Example>
  ```javascript
  ///index.js

  var mesh = require("mesh@4.0.6");

  var bus = mesh.wrap(function(operation, next) {
    next(new Error("Whoops, something went wrong!"));
  });

  bus = mesh.catchError(bus, function(error) {
    console.log("caught error: ", error.message);
  });

  bus({ name: "some command" }).on("error", function(error) {
    console.error(error.message);
  });
  ```
</Example>

#### bus yields(error, data)

Yields data. Useful for testing.

<Example>
  ```javascript  
  ///index.js
  var mesh = require("mesh@4.0.6");

  var bus = mesh.yields(void 0, ["chunk 1", "chunk 2"]);

  bus({ name: "do something"}).on("data", function(data) {
    console.log("data: ", data);
  }).on("end", function() {
    console.log("end operation");
  });
  ```
</Example>

#### bus noop

No operation bus.


<Example>
  ```javascript
  ///index.js  

  var mesh    = require("mesh@4.0.6");
  var memoize = require("memoizee");

  var bus = mesh.noop;

  bus({ name: "some command" }).on("data", function(data) {
    console.log("data - shouldn't be logged!");
  }).on("end", function() {
    console.log("no operation ended");
  });

  ```
</Example>

#### bus wait(waitFn, bus)

Waits for `waitFn` to execute before passing operations to `bus`.


<Tabs>
  <Example title="simple example">
    ```javascript
    ///index.js

    var mesh    = require("mesh@4.0.6");

    var bus = mesh.wrap(function(operation, next) {
      console.log("handle operation: ", operation);
      next(void 0, next);
    });

    function load(next) {
      console.log("wait...");
      setTimeout(next, 500);
    }

    bus = mesh.wait(load, bus);

    bus(mesh.op("doSomething"));
    ```
  </Example>
  <Example title="error example">
    ```javascript
    ///index.js

    var mesh    = require("mesh@4.0.6");

    var bus = mesh.wrap(function(operation, next) {
      console.log("handle operation: ", operation);
      next(void 0, next);
    });

    function load(next) {
      console.log("wait...");
      setTimeout(next, 500, new Error("something went wrong!"));
    }

    bus = mesh.wait(load, bus);

    bus(mesh.op("doSomething")).on("error", function(error) {
      console.error(error.message);
    });
    ```
  </Example>
  <Example title="model example">
    ```javascript  
    ///index.js

    var mesh    = require("mesh@4.0.6");
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
          bus: mesh.wait(this.load, mesh.defaults(function() {
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
      bus : mesh.defaults({ collection: "chains", query: { id: "chain1" } }, bus)
    });

    function onChainLoad(err, chain) {
      if (err) {
        console.error(err.message);
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
    ```
  </Example>
</Tabs>

#### bus timeout(ms, bus)

Times out an operation after `ms`.


<Example title="simple example">
  ```javascript
  ///index.js
  var mesh    = require("mesh@4.0.6");

  var bus = mesh.wrap(function(operation, next) {
    console.log("handle operation: ", operation);
    setTimeout(next, 1000);
  });

  bus = mesh.timeout(100, bus);

  bus(mesh.op("doSomething")).on("error", function(error) {
    console.error(error.message);
  });
  ```
</Example>

#### bus retry(count, bus)

Retries an operation against bus if an error is emitted.

<Example title="simple example">
  ```javascript
  ///index.js

  var mesh    = require("mesh@4.0.6");

  var bus = mesh.wrap(function(operation, next) {
    console.log("handle operation: ", operation);
    setTimeout(next, 100, new Error("something went wrong"));
  });

  bus = mesh.retry(5, bus);

  bus(mesh.op("doSomething")).on("error", function(error) {
    console.error(error.message);
  });
  ```
</Example>
