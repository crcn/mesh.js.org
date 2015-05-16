var Base   = require("./base");
var extend = require("xtend/mutable");
var observable = require("./mixins/observable");

/**
 */

var _i = 0;

function _createCID() {
  return (++_i) + "." + Date.now() + "." + (Math.round(Math.random() * 999999));
}

/**
 */

function Entity(properties) {
  Base.call(this, properties);

  this.cid = _createCID();
  this.ts  = Date.now();
};

/**
 */

Base.extend(Entity, observable, {

  x        : 0,
  y        : 0,
  rotation : 0,
  velocity : 0,
  width    : 0,
  height   : 0,

  dispose: function() {
    this.emit("dispose");
  }
});

/**
 */

module.exports = Entity;
