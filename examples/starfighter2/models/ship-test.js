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
      for (var i = 1000; i--;) space.update();
      expect(ship.y).to.be(110);
      next();
    }, 10);
  });

  it("can shoot the phasers", function() {
    var space = Space();
    var ship = space.addEntity({ type: "ship", bulletTTL: 0 });
    ship.shootPhasers();
    expect(space.entities.length).to.be(2);
  });

  it("move the phasers starting from the ship", function() {
    var space = Space();
    var ship = space.addEntity({ type: "ship", x: 100, y:100 });
    var bullet = ship.shootPhasers();

    expect(bullet.x).to.be(115);
    expect(bullet.y).to.be(130);

    for (var i = 100; i--;) space.update();
    expect(bullet.x).to.be(115);
    expect(bullet.y).to.be(1130);
  });

  it("rotates the bullet with the ship", function() {
    var space = Space();
    var ship = space.addEntity({ type: "ship", x: 100, y:100, rotation: 45 });
    var bullet = ship.shootPhasers();

    expect(bullet.x).to.be(126);
    expect(bullet.y).to.be(126);

    for (var i = 100; i--;) space.update();
    expect(bullet.x).to.be(826);
    expect(bullet.y).to.be(826);
  });


});
