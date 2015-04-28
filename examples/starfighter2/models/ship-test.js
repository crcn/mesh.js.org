var expect = require("expect.js");
var Ship   = require("./ship");
var Space  = require("./space");
var sinon  = require("sinon");

describe(__filename + "#", function() {

  it("can be created", function() {
    Ship();
  });

  it("increases the velocity of the ship whenever move() is called", function() {
    var s = Ship();
    s.move(1);
    expect(s.velocity).to.be(1);
    s.move(1);
    expect(s.velocity).to.be(2);
  });

  it("decrements velocity whenever update() is called", function() {
    var s = Ship();
    s.move(1);
    s.update();
    expect(s.velocity).to.be(0.5);
    s.move(1);
    s.update();
    expect(s.velocity).to.be(1);
  });

  it("can be added in space", function(next) {
    var space = Space();
    var ship = space.addEntity({ type: "ship", velocity: 10, slowdown: 0.5 });
    setTimeout(function() {
      expect(ship.y).to.be(100);
      next();
    }, 10);
  });

  it("can shoot the phasers", function(next) {
    var space = Space();
    var ship = space.addEntity({ type: "ship", bulletTTL: 0 });
    ship.shootPhasers();
    setTimeout(function() {
      expect(space.entities.length).to.be(2);
      next();
    }, 10);
  });


});
