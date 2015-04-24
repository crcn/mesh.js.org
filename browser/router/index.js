var mesh = require("mesh");

module.exports = function(app) {
  app.bus = mesh.parallel(
    mesh.accept("load", mesh.wrap(function(op, next) {
      interceptAnchors(app);
      next();
    })),
    app.bus
  )
}

function interceptAnchors(app) {

  window.onpopstate = redirect;

  function redirect() {
    mesh.run(app.bus, window.location.pathname, {}, function(err, attrs) {
      if (!attrs) return;
      app.renderBody(attrs);
    });
  }

  document.body.addEventListener("click", function(event) {
    if (event.target.nodeName !== "A") return;
    var path  = event.target.attributes.href.value;
    if (/^(https?:?)?\/\//.test(path)) return;
    event.preventDefault();
    history.pushState(void 0, path, path);
    redirect();
  })
}
