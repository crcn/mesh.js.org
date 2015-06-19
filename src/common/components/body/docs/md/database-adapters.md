Mesh doesn't have any base classes, utilities, or other abstractions to help you create specific adapters, so
you'll need to follow a few patterns to ensure that whatever adapter you write are interchangeable, and interoperable with other plugins. <br />

Before you begin writing adapters, install the `test suite` associated with them. For database adapters specifically, that command is: `npm install mesh-store-test-cases`. <br />

Below are a few operations you'll need to implement for database adapters.

#### insert

Inserts one or many items in a collection. Here are a few cases that need to work:

<Example runnable="false">
  ```javascript
  ///index.js
  // inserting one item into the people collection
  customBus({ name: "insert", collection: "people", data: { name: "Jeff" } });

  // inserting multiple items in people collection
  customBus({ name: "insert", collection: "people", data: [
    { name: "Frank" },
    { name: "Sarah" }
  });
  ```
</Example>

#### remove

Removes one or many items from a collection.

#### update

Updates one or many items in a collection.

#### load

Loads one or many items in a collection.
