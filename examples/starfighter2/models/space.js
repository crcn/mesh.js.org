var Base   = require("./base");
var _nonew = require("./_nonew");
var group  = require("./group");

/**
 */

function Space(entities) {
  Base.call(this, { entities: entities || group() });
}

/**
 */

Base.extend(Space, {

});

module.exports = _nonew(Space);
