var gulp        = require("gulp");
var istanbul    = require("gulp-istanbul");
var mocha       = require("gulp-mocha");
var plumber     = require("gulp-plumber");
var jshint      = require("gulp-jshint");
var browserify  = require("browserify");
var uglify      = require("gulp-uglify");
var source      = require("vinyl-source-stream");
var buffer      = require("vinyl-buffer");
var jscs        = require("gulp-jscs");
var coveralls   = require("gulp-coveralls");
var rename      = require("gulp-rename");
var browserSync = require("browser-sync");
var karma       = require("karma").server;
var options     = require("yargs").argv;

var pkg = require("./package");
process.env.PC_DEBUG = 1;

/**
 */

var paths = {
  testFiles  : ["test/**/*-test.js", "examples/**/*-test.js", "common/**/*-test.js", "browser/**/*-test.js"],
  appFiles   : ["lib/**/*.js"],
  allFiles   : ["test/**", "lib/**", "examples/**"]
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
 */

gulp.task("bundlejs", function() {
  var b = browserify("./browser/index.js", {
    extensions: [".jsx"],
    global: true
  });
  b.transform('reactify');
  return b.bundle().
  pipe(source('bundle.js')).
  pipe(buffer()).
  pipe(uglify()).
  pipe(gulp.dest('./static'));
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
		files: [__dirname + "/browser/**", __dirname + "/server/**", __dirname + "/common/**", __dirname + "/examples/**"]
	})
});

/**
 */

gulp.task("test-browser", function(complete) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, complete);
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

gulp.task("example", function () {
  return gulp.run("test-coverage");
});

/**
 */

gulp.doneCallback = function (err) {

  // a bit hacky, but fixes issue with testing where process
  // doesn't exist process. Also fixes case where timeout / interval are set (CC)
  if (!~iofwatch) process.exit(err ? 1 : 0);
};
