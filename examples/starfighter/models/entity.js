var caplet = require("caplet");

module.exports = caplet.createModelClass({
  rotation: 0,
  mixins: [
    require("./mixins/model")
  ],
  toData: function() {
    return {
      cid      : this.cid,
      x        : this.x,
      y        : this.y,
      ownerId  : this.owner ? this.owner.cid : void 0,
      ts       : this.timestamp,
      rotation : this.rotation,
      type     : this.type
    }
  }
});
