var caplet = require("caplet");
var Entity = require("./entity");

var classes = {
  ship: require("./ship")
}

module.exports = caplet.createCollectionClass({
  mixins: [
    require("./mixins/collection")
  ],
  createModel: function(properties) {
    properties.bus   = this.bus;
    properties.space = this.space;
    var clazz = classes[properties.type] || Entity;
    return clazz(properties);
  },
  add: function(properties, onSave) {
    var e = this.createModel(properties);
    e.save(onSave);
    this.push(e);
    return e;
  }
});
