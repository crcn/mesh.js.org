var fs        = require("fs");
var detective = require("detective");
var path      = require("path");


function _findAllDeps(filename, root) {

  filename = require.resolve(filename);
  var content = fs.readFileSync(filename, "utf8");

  if (!root) {
    root = path.dirname(filename);
  }

  var relpath = filename.replace(root, "").replace(".example", ".js");

  var deps = [
    {
      path: relpath,
      content: content
    }
  ];

  return Array.prototype.concat.apply(deps, detective(content).filter(function(relpath) {
    return /^\.\//.test(relpath);
  }).map(function(relpath) {
    return _findAllDeps(path.join(path.dirname(filename), relpath), root);
  }));
}


module.exports = _findAllDeps;
