var caplet = require("caplet");

var entityClasses = {
  bullet : require("./bullet"),
  ship   : require("./ship")
};

module.exports = caplet.createCollectionClass({
  mixins: [
    require("./mixins/collection")
  ],
  createModel: function(properties) {
    properties.bus = this.bus;
    properties.stage = this.stage;
    var clazz      = entityClasses[properties.type || properties.data.type];
    return clazz(properties);
  },
  addEntity: function(properties, onSave) {
    var entity = this.createModel(properties).save(onSave);
    return entity;
  }
});
