var Base   = require("./base");
var extend = require("xtend/mutable");
var observable = require("./mixins/observable");



/**
 */

function Entity(properties) {
  Base.call(this, properties);
};

/**
 */

Base.extend(Entity, observable, {

  x        : 0,
  y        : 0,
  rotation : 0,
  velocity : 0,

  dispose: function() {
    this.emit("dispose");
  }
});

/**
 */

module.exports = Entity;
