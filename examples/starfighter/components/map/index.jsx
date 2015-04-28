var React  = require("react");
var Space  = require("../../models/space");
var Entity = require("./entity");
var caplet = require("caplet");
var bus    = require("../../bus");
// var Robot  = require("../../models/robot");

module.exports = React.createClass({
  mixins: [caplet.watchModelsMixin],
  getInitialState: function() {

    var space = Space({
      // bus: bus
    });

    return {
      space    : space,
      entities : space.entities
    }
  },
  componentDidMount: function() {
    this._initShips();
  },
  render: function() {
    return <div id="map" ref="space" tabIndex="0" className="example-startfighter" onKeyDown={this._onKeyDown} onKeyUp={this._onKeyUp}>
      {
        this.state.space.entities.map(function(entity) {
          return <Entity key={entity.cid} entity={entity} />
        })
      }
    </div>
  },
  _initShips: function() {
    // this._robot = Robot();
    // this._addRobotShip();
    this._addShip();
  },
  _addRobotShip: function() {

    this._robot.ship = this.state.map.addShip({
     width: 30,
     height: 30,
     x: 100,
     y: 100
   });

   this._robot.ship.once("die", this._addRobotShip);
  },
  _addShip: function(onAdd) {

    this._ship = this.state.space.addEntity({
      type: "ship",
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 600)
    });

    this._tick();
    // this._ship.once("die", this._addShip);
  },
  _onKeyDown: function(event) {
    event.preventDefault();
    if (!this._keys) this._keys = {};
    this._keys[event.keyCode] = true;
  },
  _onKeyUp: function(event) {
    this._keys[event.keyCode] = false;
  },
  _tick: function() {
    setTimeout(this._tick, 1000/30);
    this._updateShipPosition();
    this._updateSpace();
  },
  _updateShipPosition: function() {

    var props = {};

    for (var c in this._keys) {
      c = Number(c);
      var isDown = this._keys[c];

      if (isDown && c === 39) {
        this._ship.rotate(6);
      } else if (isDown && c === 37) {
        this._ship.rotate(-6);
      } else if (isDown && c === 38) {
        this._ship.move(4);
      } else if (c === 32 && !isDown) {
        delete this._keys[c];
        this._ship.shootPhaser();
      }
    }


  },
  _updateSpace: function() {
    var spaceNode = this.refs.space.getDOMNode();
    var space = this.state.space;
    space.width = spaceNode.offsetWidth;
    space.height = spaceNode.offsetHeight;
    this.state.space.update();
  }
});
