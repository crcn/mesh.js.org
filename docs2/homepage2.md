### Hook

Mesh it all up
A featherlight JavaScript message bus for creating sophisticated applications
creating connected applications


### Elevator

Mesh gives you the utilities needed to build a sophisticated messaging layer that facilitates *all* remote, or local communication for your application.
Server-side and client-side.


Simplify how your application interfaces with data sources

### What can you build with mesh?

#### isomorphic applications

Easily build applications that run on any JavaScript platform including web, mobile, and server-side.

####

### Features

Build robust data-driven applications with ease

#### Just a utilty (unopinionated)

Mesh is just a bundle of utility functions - just like underscore. Use it however you want to build explicit, and powerful
message brokers.

```javascript
var mesh = require("mesh");


function createMessageStore() {
  var messages = [];
  return mesh.stream(function(operation, response) {
    if (operation.name == "addMessage") {
      messages.push({ text: operation.text });
      response.end();
    } else if (operation.name === "getMessages") {
      response.end(messages);
    } else {
      response.end();
    }
  });
}

var bus = createMessageStore();

bus({ name: "addMessage", text: "Hello" }).on("end", function() {
  bus({ name: "getMessages" }).on("data", function(messages) {
    console.log(messages); // [{ text: "Hello" }]
  });
});
```

<!-- #### Flexible

Mesh was designed to put up with even the most complex APIs. Easily use mesh to abstract, and normalize how your application  -->

#### Interoperable

Write applications that interoperate between different data sources. Adding stuff like realtime data, offline-mode, and rollbacks is a cinch.

```javascript
```


#### Decoupled

Build robust applications that operate independently of any data source.

```javascript
var mesh   = require("mesh");
var extend = require("xtend/mutable");

function UserModel(bus) {

}

extend(UserModel.prototype, {
  load: function() {

  }
});


var u = new UserModel(memory());

```

#### Testable

Write resilient unit tests that cover how your application code interacts with data sources. No more stubbing, spying, and mocking APIs that might change often.

```javascript
var u = new UserModel(mesh.wrap(function(operation, next) {

}));
```

#### Isomorphic

Build apps that run on any platform. Just swap out the service bus.






### Smaller Features

#### Stream-based

Mesh uses node streams to
#### Tiny

Only 14KB minified

#### Compatible

Mesh works with just about any framework. Easily incorporate it in your
existing Ember, React, or Angular based application.

### Support

Plugins ready to go
