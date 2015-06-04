var peg = require("pegjs");
var fs  = require("fs");
var parser = peg.buildParser(fs.readFileSync(__dirname + "/parser.peg", "utf8"));
module.exports = parser;
