
function interceptAnchors(app) {

  window.onpopstate = redirect;

  function redirect() {
    app.router.redirect(window.location.pathname);
    app.renderBody(app.router.location.state);
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

module.exports = interceptAnchors;
