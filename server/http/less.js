var glob = require("glob"),
fs = require("fs"),
less = require("less"),
memoize = require("memoizee");


module.exports = initialize;

function initialize (app, server) {


  var loadCSS = memoize(function (callback) {

    var files = sortLessFiles(
      [].
      concat(glob.sync(app.config.directories.browser + "/**/*.less")).
      concat(glob.sync(app.config.directories.common  + "/**/*.less")).
      concat(glob.sync(app.config.directories.server  + "/**/*.less"))
    );

    less.render(files.map(function (filepath) {
      return fs.readFileSync(filepath, "utf8");
    }).join("\n"), callback);

  }, { async: true, maxAge: 1000 });

  server.get("/bundle.css", function (req, res) {
    loadCSS(function (err, tree) {
      if (err) return res.send(err);
      res.end(tree.css);
    });
  });
}


function sortLessFiles (lessFiles) {
  return lessFiles.sort(function(a, b) {

    var alen = 0, blen = 0, aparts = a.split("/"), bparts = b.split("/");

    alen = aparts.length;
    blen = bparts.length;

    // not same folder depth? files with less slashes take higher
    // priority
    if (alen !== blen) {
      return alen > blen ? 1 : -1;
    }

    // same folder depth? sort by name here.
    for (var i = 0, n = aparts.length; i < n; i++) {

      var apart  = aparts[i],
      bpart      = bparts[i];

      // top folder takes highest priority. Stop when something isn't
      // equal
      if (apart !== bpart)
      if (apart > bpart) {
        return 1;
      } else {
        return -1;
      }
    }
  });
}
