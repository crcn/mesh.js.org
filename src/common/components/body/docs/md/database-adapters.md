Mesh doesn't have base classes or other abstractions to help you create adapters. You'll need to follow a few patterns to ensure that whatever you write is interoperable with other plugins. <br />

The [database test suite](https://github.com/mojo-js/mesh.js/tree/master/test-cases) was generalized and should work with just about any testing framework. Here's an example of how you might use it with [mocha](http://mochajs.org/):

<Example runnable="false">
  ```javascript
  ///index.js
  var createDBCases = require("mesh/test-cases/database");
  var memory        = require("mesh-memory");

  describe("in-memory-adapter#", function() {

    // createCases(createBus)
    // creates the cases
    var cases = createDBCases(function(options) {
      return memory(options);
    });

    for (var name in cases) {

      // register the case with mocha
      it(name, cases[name]);
    }
  });
  ```
</Example>



#### insert operation

Inserts one or many items in a collection.

<br /> Cases that need to work:
<Example runnable="false">
  ```javascript
  ///index.js
  // inserting one item into the people collection
  customBus({ name: "insert", collection: "people", data: { name: "Jeff" } }).on("data", function() {
    // called for the one person inserted.
  });

  // inserting multiple items in people collection
  customBus({ name: "insert", collection: "people", data: [
    { name: "Frank" },
    { name: "Sarah" }
  }).on("data", function() {
    // called for each person inserted
  });
  ```
</Example>

#### remove operation

Removes one or many items from a collection.

<br /> Cases that need to work:
<Example runnable="false">
  ```javascript
  ///index.js

  // remove one item from the collection
  customBus({ name: "remove", collection: "people", query: { name: "Jeff" } });

  // remove multiple items from the collection
  customBus({ name: "remove", collection: "people", multi: true, query: { name: "Jeff" } });
  ```
</Example>

#### update operation

Updates one or many items in a collection.

<br /> Cases that need to work:
<Example runnable="false">
  ```javascript
  ///index.js

  // update first occurrence of Jeff, and change the name to rachel
  customBus({ name: "update", collection: "people", query: { name: "Jeff" }, data: { name: "Rachel" } });

  // update all people named Jeff and change their names to Rachel
  customBus({ name: "update", collection: "people", multi: true, query: { name: "Jeff" }, data: { name: "Sarah" } });
  ```
</Example>

#### load operation

Loads one or many items in a collection.

<br /> Cases that need to work:
<Example runnable="false">
  ```javascript
  ///index.js

  // load one person named jeff
  customBus({ name: "load", collection: "people", query: { name: "Jeff" } });

  // load multiple people named jeff
  customBus({ name: "update", collection: "people", multi: true, query: { name: "Jeff" } }).on("data", function(data) {
    // emitted for each person found
  });
  ```
</Example>
