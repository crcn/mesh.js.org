var fs         = require("fs");
var transpiler = require("./transpiler");
var path       = require("path");

require.extensions[".md"] = function(module, filename) {

  var transpiled = transpiler.transpile(fs.readFileSync(filename, "utf8"), {
    cwd: path.dirname(filename)
  });

  console.log(transpiled);

  return module._compile(transpiled, filename);
};
