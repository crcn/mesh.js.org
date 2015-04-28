var caplet   = require("caplet");
var Entities = require("./entities");
var mesh     = require("mesh");
var grp      = require("./utils/getRotationPoint");

module.exports = caplet.createModelClass({

  /**
   */

  width: Infinity,
  height: Infinity,

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

      this._moveEntity(entity);
      this._moveInBounds(entity);
      this._checkCollisions(entity);

      entity.update();
    }
  },

  /**
   */

  _moveEntity: function(entity) {

    if (entity.velocity <= 0) return;

    var p = grp(entity);

    var x = Math.round(p.x * entity.velocity);
    var y = Math.round(p.y * entity.velocity);

    entity.setProperties({
      x: entity.x + x,
      y: entity.y + y
    });
  },

  /**
   */

  _moveInBounds: function(entity) {

    if (this.height < Infinity) {
      if (entity.y > this.height) entity.set("y", 0);
      if (entity.y < 0) entity.set("y", this.height);
    }

    if (this.width < Infinity) {
      if (entity.x > this.width) entity.set("x", 0);
      if (entity.x < 0) entity.set("x", this.width);
    }
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
});
