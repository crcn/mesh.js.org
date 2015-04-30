var React  = require("react");
var caplet = require("caplet");
var cx     = require("classnames");

module.exports = React.createClass({
  render: function() {

    var ships = this.props.entities.filter(function(entity) {
      return entity.type === "ship";
    });

    var scale = 10;
    var focus = this.props.focus;

    var s;

    /*if (ships.length) {
      s = {
        width: ships.sort(function(a, b) {
          return a.x > b.x ? -1 : 1;
        })[0].x / scale,
        height: ships.sort(function(a, b) {
          return a.y > b.y ? -1 : 1;
        })[0].y / scale
      };
    }*/

    s = {
      width: 200,
      height: 200
    };

    return <div className="map" style={s}>
      {
        ships.map(function(ship) {
          var s = {
            top: ship.y / scale,
            left: ship.x / scale
          }

          var c = cx({
            dot: true,
            "is-users": ship.cid === focus.cid
          });

          return <div className={c} style={s}></div>
        })
      }
    </div>;
  }
})
