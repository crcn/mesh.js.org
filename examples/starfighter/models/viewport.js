var caplet = require("caplet");

module.exports = caplet.createModelClass({

  /**
   * padding for the focused element
   */

  padding: 30,

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

    if (fx < this.padding) this.space.set("x", fx + this.padding);
    if (fy < this.padding) this.space.set("y", fy + this.padding);
  }
});
