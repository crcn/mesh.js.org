var Router = require("./router");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("can be created", function() {
    new Router();
  });

  it("can add a route", function() {
    var r = new Router();
    r.addRoute("home", "/home", function() {});
  });

  it("can can redirect to a route by the alias", function() {
    var i = 0;
    var r = new Router();
    r.addRoute("home", "/home", function(location) {
      i++;
    });

    r.redirect("home");
    expect(i).to.be(1);
    expect(r.location.pathname).to.be("/home");
  });

  it("can redirect to a route with params", function() {
    var i = 0;
    var r = new Router();
    r.addRoute("a", "/a/:a", function() {});
    r.addRoute("b", "/a/:b/:c", function() {});

    r.redirect("a", { params: { a: "b" } });
    expect(r.location.pathname).to.be("/a/b");
    r.redirect("b", { params: { b: "c", c: "d" } });
    expect(r.location.pathname).to.be("/a/c/d");
  });

  it("can properly sets the params on the new location", function() {
    var r = new Router();
    r.addRoute("a", "/a/:b/c", function() {});
    r.redirect("a", { params: { b: "d" }});
    expect(r.location.pathname).to.be("/a/d/c");
    expect(r.location.params.b).to.be("d");
  });

  it("can stringify a pathname with query params", function() {
    var r = new Router();
    r.addRoute("a", "/a/b/c", function() {});
    expect(r.getPath("a", {
      query: {
        d: "e"
      }
    })).to.be("/a/b/c?d=e");
  });

  it("can redirect to a pathame with a query string", function() {
    var r = new Router();
    r.addRoute("a", "/a", function() {});
    r.redirect("/a?b=c");
    expect(r.location.query.b).to.be("c");
    expect(r.location.pathname).to.be("/a");
  });
});
