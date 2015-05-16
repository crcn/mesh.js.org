var _nonew     = require("./_nonew");
var Base       = require("./base");

/**
 */

function Bullet(properties) {
  Base.call(this, properties);
}

/**
 */

Base.extend(Bullet, {

  /**
   */

  type   : "bullet",
  width  : 2,
  height : 5
  
});

/**
 */

module.exports = _nonew(Bullet);
