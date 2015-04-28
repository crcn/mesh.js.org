var caplet = require("caplet");

module.exports = caplet.createModelClass({

  /**
   * padding for the focused element
   */

  padding: 100,

  /**
   */

  tick: function() {
    if (!this.focus) return;

    var fx = this.focus.x;
    var fy = this.focus.y;

    var vx = this.space.x + fx;
    var vy = this.space.y + fy;

    var pw = this.width  - this.padding;
    var ph = this.height - this.padding;

    if (vx > pw) this.space.set("x", pw - fx);
    if (vy > ph) this.space.set("y", ph - fy);
    if (vx < this.padding) this.space.set("x", this.padding - fx);
    if (vy < this.padding) this.space.set("y", this.padding - fy);
  },

  /**
   */

  canSee: function(entity) {
    var vx = this.space.x + entity.x;
    var vy = this.space.y + entity.y;

    return vx > 0 && vx < this.width && vy > 0 && vy < this.height;
  }
});
