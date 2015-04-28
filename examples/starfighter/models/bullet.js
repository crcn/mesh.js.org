var Entity = require("./entity");

module.exports = Entity.extend({
  ttl: 1000 * 5,
  width: 2,
  height: 5,
  tick: function() {
    if (Date.now() > this.timestamp + this.ttl) {
      return this.explode();
    }
  }
});
