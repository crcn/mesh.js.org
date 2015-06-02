#### Inspiration

- https://github.com/orbitjs
- http://tower.github.io/
- https://www.rabbitmq.com/
- http://en.wikipedia.org/wiki/Message_broker
- http://noflojs.org/
- http://en.wikipedia.org/wiki/Microsoft_BizTalk_Server
- https://guides.spreecommerce.com/api/
- https://github.com/trustmaster/goflow
- https://launchpad.net/route11

#### Designs

- http://emberjs.com/
- http://krakenjs.com/
- http://picocms.org/
- http://sailsjs.org/#!/
- http://foundation.zurb.com/apps/
- https://rubygems.org/
- https://kitematic.com/
- http://www.rethinkdb.com/

#### Keywords

normalizes, unifies, isomorphic, encapsulated, interoperable, non-opinionated, utility-based,
synchronize, event bus, message broker, messaging, event bus, messaging, Testable, task, flow based,
routing, meta API, adapter

#### Headlines

Mesh it all up

Should be able to make the home screen game full screen

[ INSTALL COMMAND ]

#### Taglines

- A swiss-army knife for synchronizing data
- A featherlight utility for synchronizing data
- A lightweight messaging utility for building sophisticated features
- A featherlight utility for building passing around data
- A featherlight utility for routing data
- A featherlight data flow library
- A featherlight flow utility for building sophisticated applications
- A featherlight utility for building adapters
- A featherlight utility for managing data
- * A featherlight communication utility for building sophisticated features

#### Examples

- realtime game
- http router
- versioned API

#### Features

- Testable
- Normalizes
- Isomorphic
- Encapsulated
- * Flexible
- Interoperable
- * Components ready to go
- * Unifies
- * Built for services
- Adapters galore
- Normalizes Interfaces - built for your api
- * Brings sanity to messy APIs
- * use at any stage of an app
- * replace your event bus
  - replace flux dispatcher
- ** Unopinionated

#### Guides

- patterns
  - Building a database adapter
  - Building a realtime adapter
  - use test suites

#### Diagrams

- encapsulated - show app & adapters
- arrows -> data stores

#### Descriptions

Your application Backbone

Messaging is a complex thing. Mesh gives you the utilities needed to build a sophisticated
messaging pipeline/layer that facilitates *all* remote, or local communication for your application -
Server-side, or client-side.

[ DIAGRAM HERE ]

Backbone, network, telephone, Spine

*all* communication for your application

Flexible

Mesh doesn't make any assumptions about your codebase. Use it as an event bus system, message broker,
or use it to build complex features such as offline-mode, realtime data, rollbacks, and more.

[ GAME EXAMPLE HERE   ]
[ MESSAGE BROKER HERE ]

- broker example
- realtime example
- testing example

maybe slideshow on descriptions instead of just flexibility

- Testable - makes code *more* testable. Less stubbing & mocking.
- Flexible
- Decoupled
- Normalizes
- Isomorphic
- Write less
- Reusable
- Functional
- Streaming
- Unopinionated
- Flux replacement

Interoperable

Mesh decouples your application from data sources. Build robust applications that are more testable, isomorphic,
and doesn't lock you into *any* service /* - even your own API.

Plugins ready to go

- search bar somewhere pointing to NPM

```javascript
var mesh = require("mesh");
// var http = require("mesh-http");
// var mongo   = require("mesh-mongodb");
var memory = require("mesh-memory");

// var bus = mongo({ host: "mongodb://"});
var bus = memory();

bus(mesh.op("insert", { collection: "test", data: { name: "blah" }}));
```

[ DIGRAM HERE - swap services out ]

Mesh comes with ready to go adapters that you can drop into your application. - hover over adapters to show how they're used.

- examples must be working
- use C R U D API example
- OR just have the boxes for the adapters

Works with any framework

Mesh works with Backbone, Angular, React, or your own super slick in-house JavaScript framework.

More shorter points (things that cannot be explained in code)

- Works with any framework
- small footprint
- unopinionated
- isomorphic (maybe)
- simple
- reactive
- non-inventive (leverages existing patterns)
- consistent


* Normalizes

- bit about working with wonky APIs
- helps clean up mangled apis
- Mesh

* Other features

- Flux replacement
- Works with any framework



Utility based

Mesh is a utility-based library (similar to underscore) that helps you implement

Plugins galore

Drop-in adapters ready to go. Easily setup realtime data, offline mode, and other sophisticated things with just a few lines of code. Just copy & paste a recipe from here.

What else can you do?

Testable

#### Footer

various links

built by Craig
