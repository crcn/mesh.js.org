var parser = require("./parser");
var path   = require("path");
var fs     = require("fs");

var currentOptions = {};

exports.transpile = function(source, options) {
  currentOptions = options || { cwd: process.cwd() };
  return _transpile(parser.parse(source));
}

function _transpile(expr) {
  var buffer = "var React = require('react');" +
  "module.exports = " + _component(expr);
  // attach props here
  return buffer;
}

function _component(expr) {
  return "React.createClass({" +
    "render:function() {"  +
      "return " + _nodes(expr) +
    "}" +
  "})";
}

function _nodes(expr) {
  return _node(["element", "div", [["attribute", "className", "documentation"]], expr]);
}

function _node(expr) {
  return {
    element: _element,
    text   : _text
  }[expr[0]](expr);
}

function _element(expr) {
  return ({
    Example : _exampleElement,
    Basic   : _basicElement
  }[expr[1]] || _basicElement)(expr);
}

function _exampleElement(expr) {
  var buffer = "React.createElement(this.props.components.Example, {";
  buffer += "files:";

  var files = [];

  var attrs = expr[2];


  expr[2].forEach(function(attr) {
    if (attr[1] === "file") {
      files = [_file(path.join(currentOptions.cwd, attr[2]), true)];
    } else if (attr[1] === "directory") {

      var directory = attr[2];

      files = fs.readdirSync(path.join(currentOptions.cwd, directory)).filter(function(basename) {
        return !/^\./.test(basename);
      }).map(function(basename) {
        var filePath = path.join(currentOptions.cwd, directory, basename);
        return _file(filePath, basename === "index.js");
      });
    }
  });

  expr[3].forEach(function(child) {
    if (child[1] === "Script") {
      files.push({
        path: child[2].filter(function(attr) {
          return attr[1] === "path";
        }).shift()[2],
        content: child[3][0][1]
      });
    }
  });

  buffer += JSON.stringify(files);

  return buffer + "})";
}


function _file(filePath, entry) {
  var basename = path.basename(filePath);
  return {
    path    : basename,
    entry   : entry,
    content : fs.readFileSync(filePath, "utf8")
  };
}

function _basicElement(expr) {
  var isRegisteredComponent = _isUpperCase(expr[1].charAt(0));

  var buffer = "React.createElement(" + (isRegisteredComponent ? "this.props.components." + expr[1] : "'" + expr[1] + "'");

  buffer += ", ";

  var attrBuffer = "{" + expr[2].map(_attribute).join(", ") + "}";

  if (isRegisteredComponent) {
    // TODO - es6 not in yet
    // attrBuffer = "Object.assign({}, this.props, " + attrBuffer + ")";
  }

  buffer += attrBuffer;

  var childBuffer = expr[3].map(_node).join(",");

  if (childBuffer.length) {
    buffer += ", " + childBuffer;
  }

  buffer += ")";

  return buffer;
}

function _attribute(expr) {
  return "'" + expr[1] + "':'" + expr[2] + "'";
}

function _text(expr) {
  return "'" + expr[1] + "'";
}

function _isUpperCase(string) {
  return string.toUpperCase() === string;
}
