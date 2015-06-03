var parser = require("./parser");
var expect = require("expect.js");

describe(__filename + "#", function() {
  it("can parse text", function() {
    var ast = parser.parse("Hello");
    expect(ast[0][0]).to.be("text");
    expect(ast[0][1]).to.be("Hello");
  });

  describe("headers", function() {
    it("can parse an h1", function() {
      var ast = parser.parse("# h1");
      expect(ast[0][0]).to.be("h1");
      expect(ast[0][1]).to.be("h1");
    });

    it("can parse an h2", function() {
      var ast = parser.parse("## h2");
      expect(ast[0][0]).to.be("h2");
      expect(ast[0][1]).to.be("h2");
    });

    it("can parse an h3", function() {
      var ast = parser.parse("### h3");
      expect(ast[0][0]).to.be("h3");
      expect(ast[0][1]).to.be("h3");
    });

    it("can parse an h4", function() {
      var ast = parser.parse("#### h4");
      expect(ast[0][0]).to.be("h4");
      expect(ast[0][1]).to.be("h4");
    });

    it("can parse a header and a text block", function() {
      var ast = parser.parse("#### h4\ntext");
      console.log(ast);
      expect(ast[0][0]).to.be("h4");
      expect(ast[0][1]).to.be("h4");
    });
  });
});
