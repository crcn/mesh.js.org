var fs         = require("fs");
var transform = require("./transform");
var path       = require("path");

require.extensions[".example"] = function(module, filename) {

  var compiled = transform(filename);

  return module._compile(compiled, filename);
};
