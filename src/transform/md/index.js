var through = require("through2");
var path    = require("path");
var transpiler = require("./transpiler");

module.exports = function(filename, options) {

  var buffer = [];
  return through(function(chunk, enc, callback) {
    buffer.push(chunk.toString());
    callback();
  }, function() {

    var source = buffer.join("");

    if (/\.md$/.test(filename)) {
      source = transpiler.transpile(buffer.join(""), {
        cwd: path.dirname(filename)
      });
    }

    this.push(source);
    this.push(null);
  });
}
