var caplet   = require("caplet");
var Entities = require("./entities");
var mesh     = require("mesh");
var memory   = require("mesh-memory");
var grp      = require("./utils/getRotationPoint");

module.exports = caplet.createModelClass({

  /**
   */

  x: 0,
  y: 0,
  width: Infinity,
  height: Infinity,

  /**
   */

  bus: mesh.limit(1, mesh.tailable(memory())),

  /**
   */

  initialize: function() {
    this.entities = Entities({
      space: this,
      bus: mesh.attach({
        collection : "entities"
      }, this.bus)
    }).load();
  },

  /**
   */

  addEntity: function(properties, onSave) {
    return this.entities.add(properties, onSave);
  },

  /**
   */

   tick: function() {
    for (var i = this.entities.length; i--;) {
      var entity = this.entities.at(i);

      // entity might have been exploded
      if (!entity) continue;

      this._moveEntity(entity);
      if (!process.browser) this._checkCollisions(entity);

      entity.tick();
    }
  },

  /**
   */

  _moveEntity: function(entity) {

    if (entity.velocity <= 0) return;

    var p = grp(entity);

    var x = Math.round(p.x * entity.velocity);
    var y = Math.round(p.y * entity.velocity);

    entity.x = entity.x + x;
    entity.y = entity.y + y;
  },

  /**
   */

  _checkCollisions: function(e1) {

    if (e1.type !== "ship") return;

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
