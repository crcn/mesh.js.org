var React  = require("react");
var Ship   = require("./ship");
var Bullet = require("./bullet");
var caplet = require("caplet");

module.exports = React.createClass({
  render: function() {
    var e = this.props.entity;
    var s = {
      top: e.y,
      left: e.x,
      transform: 'rotate(' + e.rotation + 'deg)'
    };
    return <div className="entity" style={s}>{{
      ship   : <Ship entity={e} />,
      bullet : <Bullet entity={e} />
    }[this.props.entity.type]}</div>;
  }
})
