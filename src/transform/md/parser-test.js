var parser = require("./parser");
var expect = require("expect.js");

describe(__filename + "#", function() {

  function _traverse(expr, iterator, parent) {
    iterator(expr, parent);
    expr.forEach(function(child) {
      if (typeof child === "object") _traverse(child, iterator, expr);
    });
  }

  function _stringify(expr) {
    var buffer = [];
    _traverse(expr, function(expr) {
      expr.forEach(function(item) {
        if (typeof item === "string") buffer.push(item);
      });
    });
    return buffer.join("");
  }

  describe("text", function() {

    it("can be parsed", function() {
      var ast = parser.parse("Hello");
      expect(_stringify(ast)).to.be("elementptextHello");
    });

    it("can be parsed with a new line", function() {
      var ast = parser.parse("Hello\nworld");
      expect(_stringify(ast)).to.be("elementptextHello\nworld");
    });
  });

  describe("headers", function() {
    it("can parse an h1", function() {
      var ast = parser.parse("# h1");
      expect(_stringify(ast)).to.be("elementh1texth1");
    });

    it("can parse an h2", function() {
      var ast = parser.parse("## h2");
      expect(_stringify(ast)).to.be("elementh2texth2");
    });

    it("can parse an h3", function() {
      var ast = parser.parse("### h3");
      expect(_stringify(ast)).to.be("elementh3texth3");
    });

    it("can parse an h4", function() {
      var ast = parser.parse("#### h4");
      expect(_stringify(ast)).to.be("elementh4texth4");
    });

    it("can parse a header and a text block", function() {
      var ast = parser.parse("#### h4 \ntext");
      expect(_stringify(ast)).to.be("elementh4texth4 elementptexttext");
    });

    it("can parse a header and another header", function() {
      var ast = parser.parse("#### h4\n\n### h3");
      expect(_stringify(ast)).to.be("elementh4texth4elementh3texth3");
    });
  });

  describe("blockquotes", function() {
    it("can be parsed", function() {
      var ast = parser.parse("> quote");
      expect(_stringify(ast)).to.be("blockquotetextquote");
    });

    it("stops parsing at a line break", function() {
      var ast = parser.parse("> quote\n#h1");
      expect(_stringify(ast)).to.be("blockquotetextquoteelementh1texth1");
    });

    it("wraps text in a block quote if it's tabbed on a new line", function() {
      var ast = parser.parse("> quote\n\ttextt");
      expect(_stringify(ast)).to.be("blockquotetextquote\n\ttextt");
    });
  });

  describe("list", function() {
    it("can uses - to list items", function() {
      var ast = parser.parse("- item 1\n- item 2");
      expect(_stringify(ast)).to.be("elementulelementlitextitem 1elementlitextitem 2");
    });

    it("can uses * to list items", function() {
      var ast = parser.parse("* item 1\n* item 2");
      expect(_stringify(ast)).to.be("elementulelementlitextitem 1elementlitextitem 2");
    });

    it("can parse a list item that's broken into multiple lines", function() {
      var ast = parser.parse("- item 1\n\tnew-line\n- item 2");
      expect(_stringify(ast)).to.be("elementulelementlitextitem 1\n\tnew-lineelementlitextitem 2");
    });

    xit("can have embedded list items", function() {
      var ast = parser.parse("-\titem 1\n\t- item 2");
      expect(_stringify(ast)).to.be("elementulelementlitextitem 1elementulelementlitextitem 2");
    });

    it("can have links", function() {
      var ast = parser.parse("-\titem 1 new-line\n- link: [label](href)");
      expect(_stringify(ast)).to.be("elementulelementlitextitem 1 new-lineelementlitextlink: elementaattributehrefhreftextlabel");
    });
  });

  describe("horizontal-rule", function() {
    it("is defined if 3 dashes are used", function() {
      var ast = parser.parse("---");
      expect(_stringify(ast)).to.be("elementhr");
    });
    it("doesn't parse new lined items", function() {
      var ast = parser.parse("--------------------\n#h1");
      expect(_stringify(ast)).to.be("elementhrelementh1texth1");
    });
  });

  describe("images", function() {
    it("can be parsed", function() {
      var ast = parser.parse("![text](img)");
      expect(_stringify(ast)).to.be("elementimgattributealttextattributesrcimg");
    });
    it("can be parsed within text", function() {
      var ast = parser.parse("sand - ![label](http://site.com) - wich");
      expect(_stringify(ast)).to.be("elementptextsand - elementimgattributealtlabelattributesrchttp://site.comtext - wich");
    });
  });

  describe("links", function() {
    it("can be parsed", function() {
      var ast = parser.parse("[label](http://site.com)");
      expect(_stringify(ast)).to.be("elementaattributehrefhttp://site.comtextlabel");
    });
    it("can be parsed within text", function() {
      var ast = parser.parse("sand - [label](http://site.com) - wich");
      expect(_stringify(ast)).to.be("elementptextsand - elementaattributehrefhttp://site.comtextlabeltext - wich");
    });
  });

  describe("emphasis", function() {
    it("can parse `code` blocks", function() {
      var ast = parser.parse(" hello `tick` ");
      expect(_stringify(ast)).to.be("elementptexthello elementcodetextticktext ");
    });

    it("can parse **strong** blocks", function() {
      var ast = parser.parse(" hello **strong**");
      expect(_stringify(ast)).to.be("elementptexthello elementstrongtextstrong");
    });

    it("can parse *em* blocks", function() {
      var ast = parser.parse(" hello *em*");
      expect(_stringify(ast)).to.be("elementptexthello elementemtextem");
    });
  });

  describe("html", function() {
    it("can parse a comment", function() {
      var ast = parser.parse("<!--comment-->");
      expect(_stringify(ast)).to.be("commentcomment");
    });

    it("can parse an element", function() {
      var ast = parser.parse("<div></div>");
      expect(_stringify(ast)).to.be("elementdiv");
    });

    it("can parse an element with attributes", function() {
      var ast = parser.parse("<div a=\"b\" c=\"d\"></div>");
      expect(_stringify(ast)).to.be("elementdivattributeabattributecd");
    });

    it("can parse an element with a text child", function() {
      var ast = parser.parse("<div a=\"b\" c=\"d\">abcd</div>");
      expect(_stringify(ast)).to.be("elementdivattributeabattributecdelementptextabcd");
    });

    it("can parse a script tag", function() {
      var ast = parser.parse("<Script path=\"test\">var abc; abc < 5;</Script>");
      expect(_stringify(ast)).to.be("elementScriptattributepathtesttextvar abc; abc < 5;");
    });

    it("removes text blocks between elements", function() {
      var ast = parser.parse("<a></a> <b></b>");
      expect(_stringify(ast)).to.be("elementaelementb");
    });
  });
});
