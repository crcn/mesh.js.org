module.exports = function(app) {

  app.router.addRoute("home", ["/", "/index"], function(location) {
    location.set("state", {
      title: "MeshJS - A featherlight data synchronization library for creating powerful applications",
      pages: {
        body: "home"
      }
    });
  });

  app.router.addRoute("docs", "/docs", function(location) {
    location.set("state", {
      title: "Mesh documentation",
      pages: {
        body: "docs",
        docs: "api"
      }
    });
  });

  app.router.addRoute("docsCategory", "/docs/:category", function(location) {
    location.set("state", {
      title: "Mesh documentation",
      pages: {
        body: "docs",
        docs: location.params.category
      }
    });
  });

  app.router.addRoute("docsSubcategory", "/docs/:category/:subcategory", function(location) {
    location.set("state", {
      title: "Mesh documentation",
      pages: {
        body: "docs",
        docs: location.params.category,
        category: location.params.subcategory
      }
    });
  });

  app.router.addRoute("examples", "/docs/examples");
  app.router.addRoute("snippets", "/docs/snippets");
}
