var caplet = require("caplet");

module.exports = caplet.createModelClass({
  mixins: [
    require("./mixins/model")
  ],
  toData: function() {
    return {
      cid  : this.cid,
      x    : this.x,
      y    : this.y,
      type : this.type
    }
  }
});
