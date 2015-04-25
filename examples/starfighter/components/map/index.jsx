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
          return <Entity entity={entity} />
        })
      }
    </div>
  },
  _addShip: function() {
    this._ship = this.state.map.addShip({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100)
    });
  },
  _onKeyDown: function(event) {

    event.preventDefault();

    switch(event.keyCode) {
      case 37:
        this._ship.set("x", this._ship.x - 1);
        break;
      case 38:
        this._ship.set("y", this._ship.y - 1);
        break;
      case 39:
        this._ship.set("x", this._ship.x + 1);
        break;
      case 40:
        this._ship.set("y", this._ship.y + 1);
        break;
    }

    this._ship.save();
  },
  _onKeyUp: function(event) {
    
  }
})
