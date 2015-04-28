var expect = require("expect.js");
var Bullet = require("./bullet");
var Space  = require("./space");
var sinon  = require("sinon");

describe(__filename + "#", function() {

  it("explodes the bullet after ttl", function(next) {
    var b = Bullet({ ttl: 5, timestamp: Date.now() });
    setTimeout(function() {
      var s = sinon.stub(b, "explode");
      b.update();
      expect(s.callCount).to.be(1);
      next();
    }, 10);
  });
});
