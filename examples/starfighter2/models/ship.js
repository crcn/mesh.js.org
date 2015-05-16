var _nonew     = require("./_nonew");
var Base       = require("./entity");
var bullet     = require("./bullet");

/**
 */

function Ship(properties) {
  Base.call(this, properties);
}

/**
 */

Base.extend(Ship, {

  /**
   */
   
  type   : "ship",
  width  : 30,
  height : 30,

  /**
   */

  fire: function() {

    var bx = this.y;
    var by = this.y;

    this.emit("child", bullet({
      x        : bx,
      y        : by,
      rotation : this.rotation
    }));
  }
});

/**
 */

module.exports = _nonew(Ship);
