var caplet = require("caplet");
var Entity = require("./entity");

var classes = {
  ship: require("./ship"),
  bullet: require("./bullet")
};

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
    properties.cid = createCID();
    properties.timestamp = Date.now();
    var e = this.createModel(properties);
    this.push(e);
    e.insert(onSave);
    return e;
  }
});

var _i = 0;

function createCID() {
  return Date.now() + "." + (++_i);
}
