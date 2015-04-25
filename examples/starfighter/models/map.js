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

  getInitialProperties: function() {
    return {
      entities: Entities({
        bus: mesh.attach({ collection: "entities" }, this.bus)
      })
    };
  },

  /**
   */

  addShip: function(properties, onSave) {
    return this.entities.createModel(extend({}, properties, {
      type: "ship"
    })).save(onSave);
  }
});
