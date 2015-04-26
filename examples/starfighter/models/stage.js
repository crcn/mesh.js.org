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

  update: function() {
    for (var i = this.entities.length; i--;) {
      this.entities.at(i).update();
    }
  }
});
