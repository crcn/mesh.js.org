var caplet   = require("caplet");
var Entities = require("./entities");
var mesh     = require("mesh");

module.exports = caplet.createModelClass({

  /**
   */

  bus: mesh.tailable(mesh.noop),

  /**
   */

  initialize: function() {

    this.entities = Entities({
      space: this,
      bus: mesh.attach({
        collection: "entities"
      }, this.bus)
    });

    // wait for entities to change, then update
    this.entities.watch(function() {
      this.update();
    }.bind(this));
  },

  /**
   */

  addEntity: function(properties, onSave) {
    return this.entities.add(properties);
  },

  /**
   */

  update: function() {
    for (var i = this.entities.length; i--;) {
      var entity = this.entities.at(i);

      // entity might have been exploded
      if (!entity) continue;

      entity.update();
      this._moveEntity(entity);
      this._checkCollisions(entity);
    }
  },

  /**
   */

  _moveEntity: function(entity) {

    if (entity.velocity <= 0) return;

    // return;
    var rotation = entity.rotation;

    if (rotation < 0) {
      rotation = 360 + rotation;
    }

    var x = Math.round(Math.sin(rotation / 180 * Math.PI) * entity.velocity);
    var y = Math.round(Math.cos(rotation / 180 * Math.PI) * entity.velocity);

    entity.setProperties({
      x: entity.x + x,
      y: entity.y + y
    });
  },

  /**
   */

  _checkCollisions: function(e1) {

    var e1xs = e1.x;
    var e1xe = e1xs + e1.width;
    var e1ys = e1.y;
    var e1ye = e1ys + e1.height;

    for (var i = this.entities.length; i--;) {
      var e2 = this.entities.at(i);
      if (e1 === e2 || e1.ownerId === e1.cid) continue;

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
});
