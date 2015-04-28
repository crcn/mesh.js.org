var caplet = require("caplet");
var Bullet = require("./bullet");

module.exports = caplet.createCollectionClass({
  mixins: [
    require("./mixins/collection")
  ],
  createModel: function(properties) {
    properties.bus   = this.bus;
    properties.stage = this.stage;
    properties.ship  = this.ship;
    properties.type  = "bullet";
    return Bullet(properties);
  },
  create: function(properties, onSave) {
    return this.createModel(properties).save(onSave);
  },
  update: function() {
    for (var i = this.length; i--;) this.at(i).update();
  }
});
