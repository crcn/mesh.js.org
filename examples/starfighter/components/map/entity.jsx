var React  = require("react");
var Ship   = require("./ship");
var Bullet = require("./bullet");
var caplet = require("caplet");
var cx     = require("classnames");

module.exports = React.createClass({
  render: function() {
    var e = this.props.entity;
    var f = this.props.focus;

    var r = e.rotation;

    if (r < 0) {
      r = 360 + r;
    }

    var r1 = Math.cos(r/180*Math.PI);
    var r2 = Math.sin(r/180*Math.PI);

    var matrix = [r1, r2, -r2, r1, e.x, e.y];

    var s = {
      width: e.width + 'px',
      height: e.height + 'px',
      transform: 'matrix(' + matrix + ')'
    };

    var c = cx({
      entity: true,
      "is-users": e.cid == f.cid || e.ownerId == f.cid
    });

    return <div className={c} style={s}>{{
      ship   : <Ship entity={e} />,
      bullet : <Bullet entity={e} />
    }[this.props.entity.type]}</div>;
  }
})
