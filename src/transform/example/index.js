var through    = require("through2");
var transform  = require("./transform");
var path       = require("path");
var glob       = require("glob");

module.exports = function(filename, options) {


  var buffer = [];
  return through(function(chunk, enc, callback) {
    buffer.push(chunk.toString());
    callback();
  }, function() {

    var source = buffer.join("");

    if (/\.example$/.test(filename)) {
      source = transform(filename);
    }

    this.push(source);
    this.push(null);
  });
}
