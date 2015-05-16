var ship   = require("./ship");
var expect = require("expect.js");
var Bullet = require("./bullet");

describe(__filename + "#", function() {
  it("can be created", function() {
    ship();
  })

  it("emits 'child' when a bullet is fired", function() {
    var s = ship();
    var child;
    s.on("child", function(c) {
      child = c;
    });
    s.fire();
    expect(child instanceof Bullet).to.be(true);
  });
});
