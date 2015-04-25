var mesh = require("mesh");

module.exports = function(app) {

  var routesBus = routes(app.bus);

  app.bus = mesh.fallback(
    routesBus,
    app.bus
  );
}

function routes(bus) {
  return mesh.race(
    route("/", mesh.yields(void 0, {
      pages: {
        body: "home"
      }
    })),
    route("/examples", mesh.yields(void 0, {
      pages: {
        body: "examples"
      }
    })),
    route("/docs", mesh.yields(void 0, {
      pages: {
        body: "docs"
      }
    }))
  );
}

function route(path, bus) {
  var tester = new RegExp("^" + path + "$");
  return mesh.accept(function(op) {
    return tester.test(op.name);
  }, mesh.attach(function(op) {

  }, bus));
}
