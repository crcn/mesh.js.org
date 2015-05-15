var caplet = require("caplet");
var Entity = require("./entity");

var classes = {
  ship   : require("./ship"),
  bullet : require("./bullet")
};

module.exports = caplet.createCollectionClass({

  /**
   */

  mixins: [
    require("./mixins/collection")
  ],

  /**
   */

  createModel: function(properties) {
    properties.bus   = this.bus;
    properties.space = this.space;
    var clazz = classes[properties.type] || Entity;
    return clazz(properties);
  },

  /**
   */

  add: function(props, onSave) {
    props.cid       = createCID();
    props.timestamp = Date.now();
    props.local     = true;

    var entity = this.createModel(props);

    // insert immediately
    this.push(entity);

    // persist this
    entity.insert();
    return entity;
  }
});

var _i = 0;

function createCID() {
  return Date.now() + "." + (++_i);
}
