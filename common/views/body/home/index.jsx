var React = require("react");
var IDE   = require("../../ide");
var fs    = require("fs");


module.exports = React.createClass({
  render: function() {
    return (
      <div>

        <div className="row header">
          <div className="navigation">

            <div className="logo">
              MeshJS
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


        <div className="row features content">
          <div className="col-sm-6">
            <h4>Just a utility</h4>
            <p>Mesh was initially created to help normalize how applications interact with data sources,
            but it’s just a bundle of useful functions. You can easily use mesh however you want to write message handling code.</p>
          </div>
        </div>
      </div>
    );
  }
});
