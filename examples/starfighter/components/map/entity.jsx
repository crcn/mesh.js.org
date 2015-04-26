var React  = require("react");
var Ship   = require("./ship");
var Bullet = require("./bullet");
var caplet = require("caplet");

module.exports = React.createClass({
  render: function() {
    var e = this.props.entity;

    var r = e.rotation;

    if (r < 0) {
      r = 360 + r;
    }

    var r1 = Math.cos(r/180*Math.PI);
    var r2 = Math.sin(r/180*Math.PI);

    var matrix = [r1, r2, -r2, r1, e.x, e.y];

    var s = {
      transform: 'matrix(' + matrix + ')'
    };


    return <div className="entity" style={s}>{{
      ship   : <Ship entity={e} />,
      bullet : <Bullet entity={e} />
    }[this.props.entity.type]}</div>;
  }
})
