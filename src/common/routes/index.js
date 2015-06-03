module.exports = function(app) {

  app.router.addRoute("home", ["/", "/index"], function(location) {
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
      },
      docs: [
        {
          type: "category",
          value: "api",
          children: [
            {
              type: "h1",
              value: "test"
            }
          ]
        },
        {
          type: "category",
          value: "examples",
          children: [
            {
              type: "example",
              value: "basic example",
              description: "basic example",
              files: [{ path: "/index.js", content: "var a;" }]
            }
          ]
        }
      ]
    });
  });

  app.router.addRoute("examples", "/docs", function(location) {
    location.set("state", {
      pages: {
        body: "docs"
      }
    });
  });

  app.router.addRoute("snippets", "/docs", function(location) {
    location.set("state", {
      pages: {
        body: "docs"
      }
    });
  });
}
