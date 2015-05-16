var _nonew = require("./_nonew");
var Base   = require("./entity");
var bullet = require("./bullet");
var grp    = require("./utils/getRotationPoint");

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

    var p = grp(this);

    // find the middle of the ship
    var x = this.x + this.height/2;
    var y = this.y + this.height/2;

    // add rotation & move position to end of ship.
    x += p.x * (this.width/2);
    y += p.y * (this.height/2);


    this.emit("child", bullet({
      x        : x,
      y        : x,
      rotation : this.rotation,
      velocity : 10
    }));
  }
});

/**
 */

module.exports = _nonew(Ship);
