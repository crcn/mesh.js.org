var React           = require("react");
var Ticker          = require("../../models/ticker");
var Space           = require("../../models/space");
var Viewport        = require("../../models/viewport");
var SpaceComponent  = require("./space");
var Entity          = require("./entity");
var MapComponent    = require("./map");
var bus             = require("../../bus/browser")();
var Robot           = require("../../models/robot");
var mesh            = require("mesh");

/**
 */

module.exports = React.createClass({

  /**
   */

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

  /**
   */

  componentDidMount: function() {
    this._initShips();
  },

  /**
   */

  render: function() {

    var space    = this.state.space;
    var viewport = this.state.viewport;
    var entities = this.state.entities;

    return <div id="map" ref="viewport" tabIndex="0" className="example-startfighter" onKeyDown={this._onKeyDown} onKeyUp={this._onKeyUp}>
      <SpaceComponent space={space} entities={this.state.entities.filter(function(entity) {
        return viewport.canSee(entity);
      })} />
      <MapComponent entities={entities} focus={this._ship} />
    </div>
  },

  /**
   */

  _initShips: function() {
    //this._addRobotShip();
    this._addShip();
    this._tick();
  },

  /**
   */

  _addRobotShip: function() {
    if (!this._robot) this._robot = Robot();t


    this._robot.ship = this.state.space.addEntity({
      type: "ship",
      maxVelocity: 4,
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 600)
   });

   this._robot.ship.once("dispose", this._addRobotShip);
  },

  /**
   */

  _addShip: function() {

    this._ship = this.state.viewport.focus = this.state.space.addEntity({
      type: "ship",
      isUsers: true,
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 600)
    });

    this._ship.once("dispose", this._addShip);
  },

  /**
   */

  _onKeyDown: function(event) {
    event.preventDefault();
    if (!this._keys) this._keys = {};
    this._keys[event.keyCode] = true;
  },

  /**
   */

  _onKeyUp: function(event) {
    this._keys[event.keyCode] = false;
  },

  /**
   */

  _tick: function() {
    new Ticker({ bus: bus, target: this });
  },

  /**
   */

  tick: function() {
    this._updateShipPosition();
    this._updateSpace();
  },

  /**
   */

  _updateShipPosition: function() {

    var props = {};
    var vDelta = 0;
    var rDelta = 0;

    for (var c in this._keys) {
      c = Number(c);
      var isDown = this._keys[c];

      if (isDown && c === 39) {
        rDelta = 30;
      } else if (isDown && c === 37) {
        rDelta = -30;
      } else if (c === 38) {
        if (isDown) {
          vDelta = 4;
        } else {
          vDelta = -0.5;
        }
      } else if (c === 32 && !isDown) {
        delete this._keys[c];
        this._ship.shootPhaser();
      }
    }

    this._ship.move(vDelta, rDelta);
  },

  /**
   */

  _updateSpace: function() {

    var vpNode      = this.refs.viewport.getDOMNode();
    var viewport    = this.state.viewport;
    viewport.width  = vpNode.offsetWidth;
    viewport.height = vpNode.offsetHeight;

    this.state.viewport.tick();
    //this._robot.tick();
    this.state.space.tick();

    this.setState({ space: this.state.space });
  }
});
