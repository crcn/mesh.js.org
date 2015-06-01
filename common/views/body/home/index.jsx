var React = require("react");
var IDE   = require("../../ide");
var fs    = require("fs");


var features = [
  {
    title: "Just a utility",
    desc : "Mesh provides just a bundle of helpful functions and design patterns that help you build powerful, and explicit message handlers.",
    source: fs.readFileSync(__dirname + "/examples/just-a-utility.js", "utf8")
  },
  {
    title: "Decoupled",
    desc: "Mesh helps decouple your application from data sources. Easily write code that’s isomorphic, highly testable, and isn’t locked into any particular service.",
    source: fs.readFileSync(__dirname + "/examples/decoupled.js", "utf8")
  },
  {
    title: "Testable",
    desc: "Write highly testable code that is as resilient, and decoupled as your application code. No more mocking & stubbing API calls.",
    source: fs.readFileSync(__dirname + "/examples/testable.js", "utf8"),
    runnable: false
  },
  {
    title: "Interoperable",
    desc: "Easily write code that’s interoperable with other services. Features such as offline-mode, rollbacks, and realtime data are a cinch to build.",
    source: fs.readFileSync(__dirname + "/examples/interoperable.js", "utf8")
  },
  {
    title: "Flexible",
    desc: "Mesh doesn't make any assumptions about your application. Use it to rangle even the most complex APIs.",
    source: fs.readFileSync(__dirname + "/examples/flexible.js", "utf8"),
    runnable: false
  }
]


module.exports = React.createClass({
  render: function() {
    return (
      <div>

        <div className="row header">
          <div className="navigation">

            <div className="logo">
              Mesh
            </div>

            <div className="links">
              <a href="#">
                Documentation
              </a>
              <a href="#">
                Examples
              </a>
              <a href="#">
                Support
              </a>
              <a href="http://github.com/mojo-js/mesh.js">
                GitHub
              </a>
            </div>
          </div>
          <div className="hook">
            <p>A featherlight JavaScript message bus for creating sophisticated applications</p>
            <div className="install-command">
              npm install mesh --save
            </div>
          </div>
        </div>

        <div className="row elevator">
          <div className="content">
            <div className="col-sm-6">
              Mesh gives you the utilities needed to build a sophisticated messaging layer that facilitates <strong>all</strong> remote, or local communication for your application.
               <strong>&nbsp;Server-side and client-side.</strong>
            </div>
            <div className="col-sm-6">
              <img className="diagram" src="/images/home/elevator-diagram.png" />
            </div>
          </div>
        </div>

        <div className="row features">
          {
            features.map(function(feature, i) {
              return <div className="row feature content" key={i}>
                <div className="col-sm-4">
                  <div className="title">{feature.title}</div>
                  <p>{feature.desc}</p>
                </div>
                <div className="col-sm-8">
                  <IDE className="example" readOnly={false} showGutter={false} source={feature.source} runnable={feature.runnable} />
                </div>
              </div>;
            })
          }
        </div>
      </div>
    );
  }
});
