module.exports = function(app) {

  app.router.addRoute("home", "/", function(location) {
    location.set("state", {
      pages: {
        body: "home"
      }
    });
  });

  app.router.addRoute("docs", "/docs", function(location) {
    location.set("state", {
      pages: {
        body: "docs"
      }
    });
  });
}
