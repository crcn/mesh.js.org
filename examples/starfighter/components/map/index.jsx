var React  = require("react");
var Stage  = require("../../models/stage");
var Entity = require("./entity");
var caplet = require("caplet");

module.exports = React.createClass({
  mixins: [caplet.watchModelsMixin],
  getInitialState: function() {

    var stage = Stage({
      getWidth: function() {
        return this.getDOMNode().offsetWidth;
      }.bind(this),
      getHeight: function() {
        return this.getDOMNode().offsetHeight;
      }.bind(this)
    });

    return {
      map: stage,
      entities: stage.entities
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
    }, this._tick);
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
    this._updateEntities();
  },
  _updateShipPosition: function() {

    var props = {};

    for (var c in this._keys) {
      c = Number(c);
      var isDown = this._keys[c];

      if (isDown && c === 39) {
        props.rotate = 6;
      } else if (isDown && c === 37) {
        props.rotate = -6;
      } else if (isDown && c === 38) {
        props.move = 4;
      } else if (c === 32 && !isDown) {
        delete this._keys[c];
        this._ship.shootPhaser();
      }
    }

    this._ship.update(props);
  },
  _updateEntities: function() {
    // this.state.map.update();
  }
})
