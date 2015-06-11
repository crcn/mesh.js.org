var gulp        = require("gulp");
var istanbul    = require("gulp-istanbul");
var mocha       = require("gulp-mocha");
var plumber     = require("gulp-plumber");
var jshint      = require("gulp-jshint");
var browserify  = require("browserify");
var uglify      = require("gulp-uglify");
var watchify    = require("watchify");
var source      = require("vinyl-source-stream");
var buffer      = require("vinyl-buffer");
var jscs        = require("gulp-jscs");
var coveralls   = require("gulp-coveralls");
var rename      = require("gulp-rename");
var browserSync = require("browser-sync");
var extend      = require("xtend/mutable");
var options     = require("yargs").argv;

var pkg = require("./package");
process.env.PC_DEBUG = 1;

/**
 */

var paths = {
  testFiles  : ["docs/**/*-test.js", "src/**/*-test.js"],
  appFiles   : ["lib/**/*.js"],
  allFiles   : ["docs/**", "src/**"]
};

/**
 */

var mochaOptions = {
  bail     : options.bail     !== 'false',
  reporter : options.reporter || 'dot',
  grep     : options.grep   || options.only,
  timeout  : 500
}

/**
 */

gulp.task("test-coverage", function (complete) {
  gulp.
  src(paths.appFiles).
  pipe(istanbul()).
  pipe(istanbul.hookRequire()).
  on("finish", function () {
    gulp.
    src(paths.testFiles).
    pipe(plumber()).
    pipe(mocha(mochaOptions)).
    pipe(istanbul.writeReports({
        reporters: ["text","text-summary", "lcov"]
    })).
    on("end", complete);
  });
});

/**
 */

gulp.task("test-coveralls", ["test-coverage"], function () {
  return gulp.
  src("coverage/**/lcov.info").
  pipe(coveralls());
});

/**
 * TODO - add all bundling scripts here - docs, css, js
 */


var _bundle;

gulp.task("bundle", function(complete) {

  setTimeout(function() {

    if (!_bundle) {

      var b = _bundle = browserify("./src/browser/index.js", extend({}, watchify.args, {
        extensions: [".jsx", ".md", ".example"],
        global: true
      }));

      b = watchify(b);


      b.transform({ global:true  }, 'reactify');
      b.transform({ global: true }, require("./src/transform/example"));
      b.transform({ global: true }, require("./src/transform/md"));
      b.transform({ global: true }, 'brfs');
    }

    _bundle.
    bundle().
    pipe(source('bundle.js')).
    pipe(buffer()).
    // pipe(uglify()).
    pipe(gulp.dest('./static')).
    once("end", complete);

  }, 500);
});

/**
 */

gulp.task("minify", ["bundle"], function() {
  return gulp.
  src("./dist/" + pkg.name + ".js").
  pipe(uglify()).
  pipe(rename(function(path) {
      path.basename += ".min";
  })).
  pipe(gulp.dest('./dist'));
});

gulp.task("browser-sync", function(next) {
	browserSync({
		proxy: "http://localhost:8081",
		files: [__dirname + "/src/**/*.less", __dirname + "/docs/**", __dirname + "/static/**"]
	})
});

/**
 */

gulp.task("lint", function() {
  return gulp.run(["jshint", "jscs"]);
});

/**
 */

gulp.task("jscs", function() {
  return gulp.
  src(paths.appFiles).
  pipe(jscs({
      "preset": "google",
      "fileExtensions": [ ".js", "jscs" ],

      "requireParenthesesAroundIIFE": true,
      "maximumLineLength": 120,
      "validateLineBreaks": "LF",
      "validateIndentation": 2,
      "validateQuoteMarks": "\"",

      "disallowKeywords": ["with"],
      "disallowSpacesInsideObjectBrackets": null,
      "disallowImplicitTypeConversion": ["string"],
      "requireCurlyBraces": [],

      "safeContextKeyword": "self",

      "excludeFiles": [
          "test/data/**",
          "./lib/parser/parser.js"
      ]
  }));
});

/**
 */

gulp.task("jshint", function() {
    return gulp.
    src(paths.appFiles).
    pipe(jshint({
      "node"     : true,
      "bitwise"  : false,
      "eqnull"   : true,
      "browser"  : true,
      "undef"    : true,
      "eqeqeq"   : false,
      "noarg"    : true,
      "mocha"    : true,
      "evil"     : true,
      "laxbreak" : true
    })).
    pipe(jshint.reporter('default'));
});

/**
 */

gulp.task("test", function (complete) {
  gulp.
  src(paths.testFiles, { read: false }).
  pipe(plumber()).
  pipe(mocha(mochaOptions)).
  on("error", complete).
  on("end", complete);
});

var iofwatch = process.argv.indexOf("watch");

/**
 * runs previous tasks (1 or more)
 */

gulp.task("watch", function () {
  gulp.watch(paths.allFiles, process.argv.slice(2, iofwatch));
});

/**
 */

gulp.task("default", function () {
  return gulp.run("test-coverage");
});

/**
 */

gulp.doneCallback = function (err) {

  // a bit hacky, but fixes issue with testing where process
  // doesn't exist process. Also fixes case where timeout / interval are set (CC)
  if (!~iofwatch) process.exit(err ? 1 : 0);
};
