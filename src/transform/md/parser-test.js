var parser = require("./parser");
var expect = require("expect.js");

describe(__filename + "#", function() {

  describe("text", function() {
    it("can be parsed", function() {
      var ast = parser.parse("Hello");
      expect(ast[0][0]).to.be("text");
      expect(ast[0][1]).to.be("Hello");
    });
    xit("can be parsed with a new line", function() {
      var ast = parser.parse("Hello\nworld");
      expect(ast[0][0]).to.be("text");
      expect(ast[0][1]).to.be("Hello world");
    });
  });

  describe("headers", function() {
    it("can parse an h1", function() {
      var ast = parser.parse("# h1");
      expect(ast[0][1]).to.be("h1");
      expect(ast[0][3][0][1]).to.be("h1");
    });

    it("can parse an h2", function() {
      var ast = parser.parse("## h2");
      expect(ast[0][1]).to.be("h2");
      expect(ast[0][3][0][1]).to.be("h2");
    });

    it("can parse an h3", function() {
      var ast = parser.parse("### h3");
      expect(ast[0][1]).to.be("h3");
      expect(ast[0][3][0][1]).to.be("h3");
    });

    it("can parse an h4", function() {
      var ast = parser.parse("#### h4");
      expect(ast[0][1]).to.be("h4");
      expect(ast[0][3][0][1]).to.be("h4");
    });

    it("can parse a header and a text block", function() {
      var ast = parser.parse("#### h4 \ntext");
      expect(ast[0][1]).to.be("h4");
      expect(ast[0][3][0][1]).to.be("h4");
      expect(ast[1][0]).to.be("text");
      expect(ast[1][1]).to.be("text");
    });

    it("can parse a header and another header", function() {
      var ast = parser.parse("#### h4 \n\n### h3");
      expect(ast[0][1]).to.be("h4");
      expect(ast[0][3][0][1]).to.be("h4");
      expect(ast[1][0]).to.be("element");
      expect(ast[1][1]).to.be("h3");
    });
  });

  describe("blockquotes", function() {
    it("can be parsed", function() {
      var ast = parser.parse("> quote");
      expect(ast[0][0]).to.be("blockquote");
      expect(ast[0][1][0][1]).to.be("quote");
    });

    it("stops parsing at a line break", function() {
      var ast = parser.parse("> quote\n#h1");
      expect(ast[0][0]).to.be("blockquote");
      expect(ast[0][1][0][1]).to.be("quote");
      expect(ast[1][1]).to.be("h1");
      expect(ast[1][3][0][1]).to.be("h1");
    });

    it("wraps text in a block quote if it's tabbed on a new line", function() {
      var ast = parser.parse("> quote\n\ttextt");
      expect(ast.length).to.be(1);
      expect(ast[0][0]).to.be("blockquote");
      expect(ast[0][1][0][1]).to.be("quote");
      expect(ast[0][1][1][1]).to.be("textt");
    });
  });

  describe("list", function() {
    it("can uses - to list items", function() {
      var ast = parser.parse("-\titem 1\n- item 2");
      expect(ast[0][1]).to.be("ul");

      expect(ast[0][3][0][1]).to.be("li");
      expect(ast[0][3][0][3][0][1]).to.be("item 1");
      expect(ast[0][3][1][1]).to.be("li");
      expect(ast[0][3][1][3][0][1]).to.be("item 2");
    });

    it("can uses * to list items", function() {
      var ast = parser.parse("* item 1\n* item 2");
      expect(ast[0][1]).to.be("ul");
      expect(ast[0][3][0][1]).to.be("li");
      expect(ast[0][3][0][3][0][1]).to.be("item 1");
      expect(ast[0][3][1][1]).to.be("li");
      expect(ast[0][3][1][3][0][1]).to.be("item 2");
    });

    it("can parse a list item that's broken into multiple lines", function() {
      var ast = parser.parse("-\titem 1\n\tnew-line\n- item 2");
      expect(ast[0][1]).to.be("ul");
      expect(ast[0][3][0][1]).to.be("li");
      expect(ast[0][3][0][3][0][1]).to.be("item 1");
      expect(ast[0][3][0][3][1][1]).to.be("new-line");
      expect(ast[0][3][1][1]).to.be("li");
      expect(ast[0][3][1][3][0][1]).to.be("item 2");
    });

    it("can have embedded list items", function() {
      var ast = parser.parse("-\titem 1\n\t- item 2");
      expect(ast[0][3][0][3][1][1]).to.be("ul");
      expect(ast[0][3][0][3][1][3][0][3][0][0]).to.be("text");
    });

    it("can have links", function() {
      var ast = parser.parse("-\titem 1\n\tnew-line\n- link: [label](href)");
      expect(ast[0][1]).to.be("ul");
    });
  });

  describe("horizontal-rule", function() {
    it("is defined if 3 dashes are used", function() {
      var ast = parser.parse("---");
      expect(ast[0][1]).to.be("hr");
    });
    it("doesn't parse new lined items", function() {
      var ast = parser.parse("--------------------\n#h1");
      expect(ast[0][1]).to.be("hr");
      expect(ast[1][1]).to.be("h1");
    });
  });

  describe("images", function() {
    it("can be parsed", function() {
      var ast = parser.parse("![text](img)");
      expect(ast[0][1]).to.be("img");
      expect(ast[0][2][0][1]).to.be("alt");
      expect(ast[0][2][0][2]).to.be("text");
      expect(ast[0][2][1][1]).to.be("src");
      expect(ast[0][2][1][2]).to.be("img");
    });
    it("can be parsed within text", function() {
      var ast = parser.parse("sand - ![label](http://site.com) - wich");
      expect(ast.length).to.be(3);
      expect(ast[0][0]).to.be("text");
      expect(ast[0][1]).to.be("sand -");
      expect(ast[1][1]).to.be("img");
      expect(ast[2][0]).to.be("text");
      expect(ast[2][1]).to.be("- wich");
    });
  });

  describe("links", function() {
    it("can be parsed", function() {
      var ast = parser.parse("[label](http://site.com)");
      expect(ast[0][1]).to.be("a");
      expect(ast[0][3][0][1]).to.be("label");
      expect(ast[0][2][0][2]).to.be("http://site.com");
    });
    it("can be parsed within text", function() {
      var ast = parser.parse("sand - [label](http://site.com) - wich");
      expect(ast.length).to.be(3);
      expect(ast[0][0]).to.be("text");
      expect(ast[0][1]).to.be("sand -");
      expect(ast[1][1]).to.be("a");
      expect(ast[2][0]).to.be("text");
      expect(ast[2][1]).to.be("- wich");
    });
  });

  describe("emphasis", function() {
    it("can parse `code` blocks", function() {
      var ast = parser.parse(" hello `tick`");
      expect(ast[1][1]).to.be("code");
    });

    it("can parse **strong** blocks", function() {
      var ast = parser.parse(" hello **strong**");
      expect(ast[1][1]).to.be("strong");
    });

    it("can parse *em* blocks", function() {
      var ast = parser.parse(" hello *em*");
      expect(ast[1][1]).to.be("em");
    });
  });

  describe("html", function() {
    it("can parse a comment", function() {
      var ast = parser.parse("<!--comment-->");
      expect(ast[0][1]).to.be("comment");
    });

    it("can parse an element", function() {
      var ast = parser.parse("<div></div>");
      expect(ast[0][0]).to.be("element");
      expect(ast[0][1]).to.be("div");
    });

    it("can parse an element with attributes", function() {
      var ast = parser.parse("<div a=\"b\" c=\"d\"></div>");
      expect(ast[0][0]).to.be("element");
      expect(ast[0][1]).to.be("div");
      expect(ast[0][2][0][1]).to.be("a");
      expect(ast[0][2][1][1]).to.be("c");
    });

    it("can parse an element with a text child", function() {
      var ast = parser.parse("<div a=\"b\" c=\"d\">abcd</div>");
      expect(ast[0][3][0][1]).to.be("abcd");
    });

    it("can parse a script tag", function() {
      var ast = parser.parse("<Script path=\"test\">var abc; abc < 5;</Script>");
      expect(ast[0][3][0][1]).to.be("var abc; abc < 5;");
    });
  });
});
