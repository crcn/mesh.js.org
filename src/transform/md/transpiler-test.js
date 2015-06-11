var transpiler = require("./transpiler");
var expect     = require("expect.js");
var jsdom      = require("jsdom");

// need to initialize before requiring react -- ughhh >.>
global.document = jsdom.jsdom("<html><head></head><body></body></html>");
global.window      = document.defaultView;
global.navigator   = window.navigator;
global.document    = window.document;
global.HTMLElement = window.HTMLElement;

var React = require("react");

function _compile(source) {
  return new Function("module", "require", transpiler.transpile(source, { cwd: __dirname }) + "\nreturn module.exports;")({module:{}}, require);
}

describe(__filename + "#", function() {

  var div;

  beforeEach(function() {
    div = document.createElement("div");
  });

  it("can transpile text to a react component", function() {
    var component = React.createElement(_compile("some text's"));
    React.render(component, div);
    expect(div.innerHTML).to.contain("some text's");
  });

  it("can render a registered component", function() {
    var component = React.createElement(_compile("<SayHello text=\"Jeff\"></SayHello>"), {
      components: {
        SayHello: React.createClass({
          render: function() {
            return React.createElement("h1", void 0, "Hello " + this.props.text);
          }
        })
      }
    });
    React.render(component, div);
    expect(div.innerHTML).to.contain("Hello Jeff");
  });

  it("loads examples from a directory when <Example /> is present", function() {

    var component = React.createElement(_compile("<Example entry=\"index.js\" directory=\"./_fixtures/example\" />"), {
      components: {
        Example: React.createClass({
          render: function() {
            var files = this.props.files;
            expect(files.length).to.be(2);
            expect(files[0].path).to.be("dep.js");
            expect(files[1].path).to.be("index.js");
            return React.createElement("span", void 0, "example");
          }
        })
      }
    });

    React.render(component, div);
    expect(div.innerHTML).to.contain("example");

  });

  it("can embed example files as child nodes", function() {

    var source =
    "<Example>" +
      "```javascript\n//index.js\n" +
        "var abc;" +
      "```" +
    "</Example>";

    var component = React.createElement(_compile(source), {
      components: {
        Example: React.createClass({
          render: function() {
            var files = this.props.files;
            expect(files.length).to.be(1);
            expect(files[0].path).to.be("index.js");
            expect(files[0].content).to.be("var abc;");
            return React.createElement("span", void 0, "example");
          }
        })
      }
    });

    React.render(component, div);
    expect(div.innerHTML).to.contain("example");
  });

  it("attaches h4s as headings", function() {
    var Component = _compile("#### some header");
    expect(Component.categories[0].label).to.be("some header");
  });

  it("attaches IDs to headers", function() {
    var component = React.createElement(_compile("### accept(condition, bus[, ebus])"));
    React.render(component, div);
    expect(div.innerHTML).to.contain("id=\"acceptcondition-bus-ebus\"");
  });

  it("trims empty text", function() {

  });
});
