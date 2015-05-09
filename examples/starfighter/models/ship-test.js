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

  xit("decrements velocity whenever update() is called", function() {
    var s = Ship();
    s.move(1);
    s.tick();
    expect(s.velocity).to.be(0.5);
    s.move(1);
    s.tick();
    expect(s.velocity).to.be(1);
  });

  it("can be added in space", function(next) {
    var space = Space();
    var ship = space.addEntity({ type: "ship", velocity: 10, drag: 0.5 });

    setTimeout(function() {
      for (var i = 100; i--;) space.tick();
      expect(ship.y).to.be(-100);
      next();
    }, 10);
  });

  it("can shoot the phasers", function() {
    var space = Space();
    var ship = space.addEntity({ type: "ship", bulletTTL: 0 });
    ship.shootPhaser();
    expect(space.entities.length).to.be(2);
  });

  it("move the phasers starting from the ship", function() {
    var space = Space();
    var ship = space.addEntity({ type: "ship", x: 100, y:100 });
    var bullet = ship.shootPhaser();

    expect(bullet.x).to.be(115);
    expect(bullet.y).to.be(100);

    for (var i = 100; i--;) space.tick();
    expect(bullet.x).to.be(115);
    expect(bullet.y).to.be(-900);
  });

  it("rotates the bullet with the ship", function() {
    var space = Space();
    var ship = space.addEntity({ type: "ship", x: 100, y:100, rotation: 45 });
    var bullet = ship.shootPhaser();

    expect(bullet.x).to.be(126);
    expect(bullet.y).to.be(104);

    for (var i = 100; i--;) space.tick();
    expect(bullet.x).to.be(826);
    expect(bullet.y).to.be(-596);
  });

  it("saves the ship if moved", function() {
    var ship = Ship();
    var stub = sinon.stub(ship, "update");
    ship.tick();
    expect(stub.callCount).to.be(0);
    ship.move(10);
    ship.tick();
    expect(stub.callCount).to.be(1);
  });

  it("saves the ship if rotated", function() {
    var ship = Ship();
    var stub = sinon.stub(ship, "update");
    ship.tick();
    expect(stub.callCount).to.be(0);
    ship.rotate(1);
    ship.tick();
    expect(stub.callCount).to.be(1);
  });

  it("doesn't exceed max velocity", function() {
    var ship = Ship({ maxVelocity: 10 });
    for (var i = 100; i--;) ship.move(1);
    expect(ship.velocity).to.be(10);
  });
});
