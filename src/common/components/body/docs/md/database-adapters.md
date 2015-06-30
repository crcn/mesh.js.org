Mesh comes with various database adapters that share the same `CRUD` operations. The current list is on the [main mesh.js README page](https://github.com/mojo-js/mesh.js). <br />

If you're looking to build a custom DB adapter, You'll need to use the [database test suite](https://github.com/mojo-js/mesh.js/tree/master/test/cases) to ensure that whatever you write is interoperable with other plugins.

Below are a set of operations you can use with database adapters.

#### insert operation

Inserts one or many items in a collection. Each inserted item is streamed back as `data`.

<br />Syntax: `{ name: "insert", collection: collectionName, data: ObjectOrArray }`

<br /> Cases:
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

<br />Syntax: `{ name: "remove", collection: collectionName, multi: Boolean, query: Object }`

<br /> Cases:
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

<br />Syntax: `{ name: "update", collection: collectionName, multi: Boolean, query: Object, data: Object }`

<br /> Cases:
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

Loads one or many items from a collection. Each item found is streamed back as `data`.

<br />Syntax: `{ name: "load", collection: collectionName, multi: Boolean, query: Object }`

<br /> Cases:
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
