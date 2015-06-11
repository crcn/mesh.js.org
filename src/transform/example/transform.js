var fs        = require("fs");
var detective = require("detective");
var path      = require("path");
var _findAllDeps = require("./findAllDeps");

module.exports = function(entry) {
  return "module.exports = " + JSON.stringify(_findAllDeps(entry), null, 2);
}
