var peg = require("pegjs");
var fs  = require("fs");
module.exports = peg.buildParser(fs.readFileSync(__dirname + "/parser.peg", "utf8"));
