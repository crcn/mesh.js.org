var React  = require("react");
var Map    = require("../../models/map");
var Entity = require("./entity");
var caplet = require("caplet");

module.exports = React.createClass({
  mixins: [caplet.watchModelsMixin],
  getInitialState: function() {
    return {
      map: Map()
    }
  },
  componentDidMount: function() {
    this._addShip();
  },
  render: function() {
    return <div id="map" tabIndex="0" className="example-startfighter" onKeyDown={this._onKeyDown} onKeyUp={this._onKeyUp}>
      {
        this.state.map.entities.map(function(entity) {
          return <Entity key={entity.cid} entity={entity} />
        })
      }
    </div>
  },
  _addShip: function() {
    this._ship = this.state.map.addShip({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100)
    });

    return;
    for (var i = 500; i--;) {
      this.state.map.addShip({
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100)
      });
    }
  },
  _onKeyDown: function(event) {
    event.preventDefault();
    if (!this._keys) this._keys = {};
    this._keys[event.keyCode] = true;
    if (this._timer) return;
    this._timer = setInterval(this._onRapidKeyDown, 10);
  },
  _onKeyUp: function(event) {
    this._keys[event.keyCode] = false;
    var isDown = false;
    for (var k in this._keys) {
      isDown = this._keys[k] || isDown;
    }
    if (!isDown) {
      clearInterval(this._timer);
      this._timer = void 0;
    }
  },
  _onRapidKeyDown: function() {
    for (var k in this._keys) {
      if (this._keys[k]) this._updateShip(Number(k));
    }
  },
  _updateShip: function(c) {
    if (c === 39) {
      this._ship.rotate(1);
    } else if (c === 37) {
      this._ship.rotate(-1);
    } else if (c === 38) {
      this._ship.move(1);
    } else if (c === 32) {
      this._ship.shootPhaser();
    }
  }
})
