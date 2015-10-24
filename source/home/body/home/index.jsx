var React      = require("react");
var Highlight  = require("./highlight");
var fs         = require("fs");
var Navigation = require("../../navigation");
var Link       = require("../../link");

/*
- Lightweight *
- Extensible
- Streamable
- Compatible/Interoperable
- Flexible
- Isomorphic
- Testable
*/

// Mesh is an abstraction layer for all local & remote communication. Easily build
// sophisticated features such as offline-mode, rollbacks and more. Decouple your apps
// from data sources, amekin
var features = [
  {
    title: "Lightweight",
    desc : "Powerful and lightweight. Mesh is only 3kb gzipped in the browser.",
    icon: "leaf"
  },

  // todo - and more (with a link)
  {
    title: "Decoupled",
    desc : "Easily swap out services such as Mongodb & PubNub. No more vendor lock in.",
    icon: "unlocked"
  },
  {
    title: "es6 ready",
    desc : "Mesh uses node-like streams, and is compatible with other stream-based libraries such as HighlandJS.",
    icon: "social-nodejs"
  },
  {
    title: "Testable",
    desc : "Mesh makes it easy to test service level code. Just swap out the service adapter for a fake one.",
    icon: "beaker"
  },
  {
    title: "Works with APIs",
    desc: "Easily <a href='/docs/database-adapters'>write adapters</a> for your <a href='https://github.com/crcn/mesh.js/tree/master/examples/api'>service API</a> and unlock the ability to interoperate with other mesh <a href='https://www.npmjs.com/search?q=meshjs'>plugins</a>.",
    icon: "heart"
  }
];


/*

Lightweight, flexible,

*/

var features = [
  {
    title: "Flexible",
    desc : "Mesh is unopinionated. Use it to bring sanity to even the most complicated APIs.",
    icon: "shuffle"
  },
  {
    title: "Adaptable",
    // desc : "Mesh makes it easy to write apps that work with any database, any API. Write highly testable code that runs on any platform",
    desc : "Write highly testable apps that work with any database, any API. No more vendor lock-in.",
    icon: "unlocked"
  },
  {
    title: "Modular",
    desc : "Write complex features with ease. Connect services together such as socket.io, and local storage to build things such as realtime data, rollbacks, offline mode, and more.",
    icon: "social-buffer"
  }
]

var plugins = [
  {
    name: "socket.io"
  },
  {
    name: "Mongodb"
  },
  {
    name: "local storage"
  },
  {
    name: "loki"
  }
];

var examples = [
  {
    path: "/index.js",
    title: "Just a utility",
    runnable: false,
    desc : "Think of it like underscore for data. Mesh is just a bundle of helpful functions that make it easy to write explicit and flexible data handlers. Use it with any framework on any platform - Mesh should be complimentary to your existing application stack.",
    content: `
// var storage = FakeStorageBus.create();
var storageBus = LocalStorageDbBus.create();

// persist all operations to socket.io & any operations from socket.io
// back to local storage.
var mainBus = ParallelBus.create([
  storageBus,
  SocketIoBus.create({ channel: "operations" }, storageBus)
]);

// insert data. Persists to local storage, and gets
// broadcasted to all connected clients.
mainBus.execute({
  action : "insert",
  collection : "messages"
  data : { text: "hello world" }
}).readAll().then(function() {
  // handle response
});
    `,
    icon: "settings"
  }
];

function _chop(array, size) {
  var ret = Array.apply(void 0, new Array(Math.ceil(array.length / size))).map(function(v, i) {
    var start = i * size;
    return array.slice(start, start + size);
  });

  return ret;
}

module.exports = React.createClass({
  render: function() {

    return (
      <div className="home">

        <div className="row header">

          <Navigation {...this.props} />

          <div className="hook">
            <p>A JavaScript message bus library creating powerful features</p>
            <div className="install-command">
              npm install mesh --save
            </div>
          </div>
        </div>

        <div className="row elevator">
          <div className="content">
            <div className="col-sm-6">
              Mesh is a library that gives you the utilities needed to build a sophisticated messaging layer that facilitates remote, and local communication for your application.
               <strong>&nbsp;Server-side and client-side.</strong>
            </div>
            <div className="col-sm-6">
              <img className="diagram hidden-xs" src="/images/home/elevator-diagram.png" />
            </div>
          </div>
        </div>

        <div className="row features main">
          {
            examples.map(function(feature, i) {
              return <div className="row feature" key={i}>
                <div className="content">
                  <div className="col-sm-4">
                    <div className="title"><i className={"ion-" + feature.icon}></i>{feature.title}</div>
                    <p>{feature.desc}</p>
                  </div>
                  <div className="col-sm-8">
                    <Highlight className="example" code={feature.content} language="javascript" />
                  </div>
                </div>
              </div>;
            })
          }

        </div>

        <div className="row features little">
          <div className="content">
            <hr />
            {
              _chop(features, 3).map(function(row) {
                return <div className="row feature">
                  {
                    row.map(function(column) {
                      return <div className={"feature col-sm-" + (12 / row.length)}>
                        <div className="title"><i className={"ion-" + column.icon}></i>{column.title}</div>
                        <p dangerouslySetInnerHTML={ { __html: column.desc } }></p>
                      </div>;
                    })
                  }
                </div>;
              })
            }
          </div>
        </div>

        <div className="row cta-examples hidden">
          Checkout some <a href="//github.com/crcn/mesh.js/tree/master/examples">examples</a> of what you can build with Mesh.
        </div>


        <div className="row footer hidden-xs">
          <div className="col-sm-4">
            <div className="copyright">
              <div>Code licensed under <a href="https://github.com/crcn/mesh.js/blob/master/MIT-LICENSE.txt">MIT</a></div>
              Designed & developed by <a href="//crcn.io">Craig Condon</a>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="row navigation">
              <ul className="col-sm-4">
                <li>Downloads</li>
                <li><a href="https://raw.githubusercontent.com/crcn/mesh.js/master/dist/mesh.min.js">browser bundle</a></li>
                <li><a className="hidden" href="https://www.npmjs.com/search?q=meshjs">Plugins</a></li>
              </ul>
              <ul className="col-sm-4">
                <li>Docs</li>
                <li><a className="hidden" href="https://github.com/crcn/mesh.js/tree/master/examples">Examples</a></li>
                <li><a href="//github.com/crcn/mesh.js/tree/master/docs" category="core" {...this.props}>Core API</a></li>
                <li><a className="hidden" href="//github.com/crcn/mesh.js/tree/master/extra">Other docs</a></li>
              </ul>
              <ul className="col-sm-4">
                <li>Connect</li>
                <li><a href="http://github.com/crcn/mesh.js">GitHub</a></li>
                <li><a href="http://twitter.com/mojoframework">Twitter</a></li>
                <li><a href="https://groups.google.com/forum/#!forum/meshjs">Google group</a></li>
                <li><a href="https://gitter.im/crcn/mesh.js">Chat</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
