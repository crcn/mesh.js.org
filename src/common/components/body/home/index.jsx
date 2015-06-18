var React      = require("react");
var IDE        = require("../../ide");
var fs         = require("fs");
var SocialBar  = require("./social-bar");
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

var features = [
  {
    title: "Lightweight",
    desc : "Powerful and lightweight. Mesh is only 5kb gzipped in the browser.",
    icon: "leaf"
  },

  // todo - and more (with a link)
  {
    title: "Decoupled",
    desc : "Write code that's decoupled from data sources including Mongodb, and PubNub. No more service vendor lock.",
    icon: "unlocked"
  },
  {
    title: "Interoperable",
    desc : "Connect services together such as socket.io, and local storage to build complex features such as realtime data, offline mode, and more.",
    icon: "shuffle"
  },
  {
    title: "Stream-based",
    desc : "Mesh uses node-like streams, and is compatible with other stream-based libraries such as HighlandJS.",
    icon: "social-nodejs"
  },
  {
    title: "Testable",
    desc : "Mesh makes service level code easy to test. Just swap out the service adapter for a fake one. No more stubs.",
    icon: "beaker"
  },
  {
    title: "Works with APIs",
    desc: "Easily write adapters for your service API and unlock the ability to interoperate with other mesh plugins.",
    icon: "heart"
  }
]

var features2 = [
  {
    path: "/index.js",
    title: "Lightweight",
    desc : "Powerful and lightweight. Mesh is only 5kb gzipped in the browser.",
    content: fs.readFileSync(__dirname + "/examples/just-a-utility.js", "utf8"),
    icon: "leaf"
  },
  {
    path: "/index.js",
    title: "Decoupled",
    desc: "Mesh helps decouple your application from data sources. Write code that’s isomorphic, and isn’t locked into any particular service.",
    content: fs.readFileSync(__dirname + "/examples/decoupled.js", "utf8"),
    icon: "unlocked"
  },
  {
    path: "/index.js",
    title: "Interoperable",
    desc: "Connect services together to build powerful features such as rollbacks, offline-mode, realtime data, and more.",
    content: fs.readFileSync(__dirname + "/examples/interoperable.js", "utf8"),
    icon: "shuffle"
  },
  {
    path: "/index.js",
    title: "Testable",
    desc: "Easily write unit tests that fake complex interactions between services such as mongodb, and socket.io.",
    // desc: "mesh makes it easy to write testable",
    content: fs.readFileSync(__dirname + "/examples/flexible.js", "utf8"),
    runnable: false,
    icon: "beaker"
  },
  {
    path: "/index.js",
    title: "Extensible",
    desc: "Mesh comes with an array of adapters such as mongodb, socket.io, webrtc, local storage, and pubnub.",
    content: fs.readFileSync(__dirname + "/examples/flexible.js", "utf8"),
    runnable: false,
    icon: "outlet"
  },
  {
    path: "/index.js",
    title: "Built for APIs",
    desc: "Easily write adapters for your API and unlock the ability to interoperate with other mesh plugins.",
    content: fs.readFileSync(__dirname + "/examples/flexible.js", "utf8"),
    runnable: false,
    icon: "heart"
  }
];

var mainExampleFile = {
  path: "/index.js",
  content: fs.readFileSync(__dirname + "/examples/main.js", "utf8"),
}

var examples = [
  {
    path: "/index.js",
    title: "Just a utility",
    desc : "Think of it like underscore for data. Mesh is just a bundle of helpful functions that make it easy to write explicit and flexible data handlers. There's nothing opinionated about it that would get in your way.",
    content: fs.readFileSync(__dirname + "/examples/main.js", "utf8"),
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

    var currentExample = examples[0];

    return (
      <div className="home">

        <div className="row header">

          <Navigation {...this.props} />

          <div className="hook">
            <p>A featherlight data flow library for creating powerful applications</p>
            <div className="install-command">
              npm install mesh --save
            </div>
          </div>

          <SocialBar {...this.props} />
        </div>

        <div className="row elevator">
          <div className="content">
            <div className="col-sm-6">
              Mesh gives you the utilities needed to build a sophisticated messaging layer that facilitates <strong>all</strong> remote, or local communication for your application.
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
                    <IDE className="example" readOnly={true} showGutter={false} files={[feature]} runnable={feature.false} />
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
                        <p>{column.desc}</p>
                      </div>;
                    })
                  }
                </div>;
              })
            }
          </div>
        </div>

        <div className="row cta-examples">
          Checkout some <a href="//github.com/mojo-js/mesh.js/tree/master/examples">examples</a> of what you can build with Mesh.
        </div>


        <div className="row footer hidden-xs">
          <div className="col-sm-4">
            <div className="logo">
              <a href="http://github.com/mojo-js">
                <img src="/images/logos/mojo-js-white.png"></img>
              </a>
            </div>
            <div className="copyright">
              <div>Code licensed under <a href="https://github.com/mojo-js/mesh.js/blob/master/MIT-LICENSE.txt">MIT</a></div>
              Designed & developed by <a href="https://github.com/crcn">Craig Jefferds</a>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="row navigation">
              <ul className="col-sm-4">
                <li>Downloads</li>
                <li><a href="https://raw.githubusercontent.com/mojo-js/mesh.js/master/dist/mesh.min.js">browser bundle</a></li>
                <li><a href="https://www.npmjs.com/search?q=meshjs">Plugins</a></li>
              </ul>
              <ul className="col-sm-4">
                <li>Docs</li>
                <li><Link href="https://github.com/mojo-js/mesh.js/tree/master/examples">Examples</Link></li>
                <li><Link alias="docsCategory" category="core" {...this.props}>Core API</Link></li>
                <li><Link alias="docsCategory" category="balance" {...this.props}>Load Balancing API</Link></li>
              </ul>
              <ul className="col-sm-4">
                <li>Connect</li>
                <li><a href="http://github.com/mojo-js/mesh.js">GitHub</a></li>
                <li><a href="http://twitter.com/mojoframework">Twitter</a></li>
                <li><a href="https://groups.google.com/forum/#!forum/meshjs">Google group</a></li>
                <li><a href="https://gitter.im/mojo-js/mesh.js">Chat</a></li>
                <li>API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
