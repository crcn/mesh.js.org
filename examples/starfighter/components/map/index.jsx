var React  = require("react");
var Space  = require("../../models/space");
var Viewport = require("../../models/viewport");
var Entity = require("./entity");
var Map    = require("./map");
var Entities = require("../../models/entities");
var caplet = require("caplet");
var bus    = require("../../bus")();
var Robot  = require("../../models/robot");

module.exports = React.createClass({
  getInitialState: function() {

    var space = Space({
      bus: bus
    });

    var viewport = Viewport({
      space: space
    });


    return {
      viewport : viewport,
      space    : space,
      entities : space.entities
    }
  },
  componentDidMount: function() {
    this._initShips();
  },
  render: function() {

    var s = {
      //transform: 'matrix(' + [0, 0, 0, 0, 0, 0] + ')'
      top: this.state.space.y,
      left: this.state.space.x
    };

    var space    = this.state.space;
    var entities = this.state.entities;
    var viewport = this.state.viewport;

    return <div id="map" ref="viewport" tabIndex="0" className="example-startfighter" onKeyDown={this._onKeyDown} onKeyUp={this._onKeyUp}>
      <div className="space" style={s}>
        {
          entities.filter(function(entity) {
            return viewport.canSee(entity);
          }).map(function(entity) {
            return <Entity key={entity.cid} entity={entity} focus={this._ship} />
          }.bind(this))
        }
      </div>
      <Map entities={entities} focus={this._ship} />
    </div>
  },
  _initShips: function() {
    // this._addRobotShip();
    this._addShip();
    this._tick();
  },
  _addRobotShip: function() {
    if (!this._robot) this._robot = Robot();

    this._robot.ship = this.state.space.addEntity({
      type: "ship",
      maxVelocity: 4,
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 600)
   });

   this._robot.ship.once("dispose", this._addRobotShip);
  },
  _addShip: function(onAdd) {

    this._ship = this.state.viewport.focus = this.state.space.addEntity({
      type: "ship",
      isUsers: true,
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 600)
    });

    this._ship.once("dispose", this._addShip);
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
    this._fps = 30;
    setTimeout(this._tick, 1000/this._fps);
    this._updateShipPosition();
    this._updateSpace();
  },
  _updateShipPosition: function() {

    var props = {};

    for (var c in this._keys) {
      c = Number(c);
      var isDown = this._keys[c];

      if (isDown && c === 39) {
        this._ship.rotate(360/this._fps/2);
      } else if (isDown && c === 37) {
        this._ship.rotate(-360/this._fps/2);
      } else if (c === 38) {
        if (isDown) {
          this._ship.move(4);
        } else {
          this._ship.move(-0.5);
        }
      } else if (c === 32 && !isDown) {
        delete this._keys[c];
        this._ship.shootPhaser();
      }
    }
  },
  _updateSpace: function() {

    var vpNode      = this.refs.viewport.getDOMNode();
    var viewport    = this.state.viewport;
    viewport.width  = vpNode.offsetWidth;
    viewport.height = vpNode.offsetHeight;

    this.state.viewport.tick();
    // this._robot.tick();
    this.state.space.tick();

    this.setState({ space: this.state.space });
  }
});
