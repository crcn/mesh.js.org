var caplet   = require("caplet");
var Entities = require("./entities");
var bus      = require("../bus");
var mesh     = require("mesh");
var extend   = require("xtend/mutable");

module.exports = caplet.createModelClass({

  /**
   */

  bus: bus,

  /**
   */

  initialize: function() {
    this.setProperties({
      entities: Entities({
        stage: this,
        bus: mesh.attach({ collection: "entities" }, this.bus)
      })
    });

    this.entities.watch(this._onEntitiesChange.bind(this));
  },

  /**
   */

  addShip: function(properties, onSave) {
    return this.entities.addEntity(extend({}, properties, {
      type: "ship"
    }), onSave);
  },

  /**
   */

  _onEntitiesChange: function() {
    for (var i = this.entities.length; i--;) {
      var e1 = this.entities.at(i);

      if (!e1 || e1.type !== "ship") continue;

      var e1xs = e1.x;
      var e1xe = e1xs + e1.width;
      var e1ys = e1.y;
      var e1ye = e1ys + e1.height;

      for (var j = this.entities.length; j--;) {
        var e2 = this.entities.at(j);
        if (e1 === e2 || e2.ownerId === e1.cid) continue;

        var e2xs = e2.x;
        var e2xe = e2xs + e2.width;
        var e2ys = e2.y;
        var e2ye = e2ys + e2.height;


        if (!(e1ys > e2ye || e1xe < e2xs || e1ye < e2ys || e1xs > e2xe)) {
          e1.explode();
          e2.explode();
          break;
        }
      }
    }
  }
});
