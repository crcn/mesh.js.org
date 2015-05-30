var React = require("react");
var IDE   = require("../../ide");
var fs    = require("fs");


var features = [
  {
    title: "Just a utility",
    desc : "Mesh was initially created to help normalize how applications interact with data sources, but it’s just a bundle of useful functions. You can easily use mesh however you want to write message handling code."
  },
  {
    title: "Decoupled",
    desc: "Mesh helps decouple your application from data sources. Easily write code that’s isomorphic, highly testable, and isn’t locked into any particular service vendor."
  },
  {
    title: "Testable",
    desc: "Write highly testable code that’s as resilient, and decoupled as your application code. No more mocking & stubbing API calls."
  },
  {
    title: "Interoperable",
    desc: "Easily write code that’s interoperable with other services. Features such as offline-mode, rollbacks, and realtime data are a cinch to build."
  },
  {
    title: "Flexible",
    desc: "Mesh is flexible enough to rangle even the most complex messaging systems."
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
              Mesh gives you the utilities needed to build a sophisticated messaging layer that facilitates *all* remote, or local communication for your application.
              Server-side and client-side.
            </div>
            <div className="col-sm-6">
              <img className="diagram" src="/images/home/elevator-diagram.png" />
            </div>
          </div>
        </div>


        {
          features.map(function(feature) {
            return <div className="row feature content">
              <div className="col-sm-6">
                <div className="title">{feature.title}</div>
                <p>{feature.desc}</p>
              </div>
            </div>;
          })
        }
      </div>
    );
  }
});
