var caplet = require("caplet");

module.exports = caplet.createModelClass({
  rotation: 0,
  mixins: [
    require("./mixins/model")
  ],
  explode: function() {
    this.remove();
    this.emit("dispose");
  },
  toData: function() {
    return {
      cid      : this.cid,
      x        : this.x,
      y        : this.y,
      width    : this.width,
      height   : this.height,
      ownerId  : this.ownerId,
      ts       : this.timestamp,
      rotation : this.rotation,
      type     : this.type
    }
  }
});
