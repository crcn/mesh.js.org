var expect = require("expect.js");
var Space  = require("./space");
var sinon  = require("sinon");

describe(__filename + "#", function() {

  it("can create some space", function() {
    Space();
  });

  it("can add an entity to the space", function() {
    var s = Space();
    s.addEntity({ type: "ship" });
  });

  it("properly moves the entity on a Y plane based on the velocity", function() {
    var s = Space();
    var ship = s.addEntity({
      type: "ship",
      velocity: 5,
      rotation: 0, x: 0, y: 0, update: function() {
        this.velocity -= 0.5;
      } });

    for (var i = 1000; i--;) s.update();

    expect(ship.x).to.be(0);
    expect(ship.y).to.be(30);

  });

  it("properly moves the entity on a X plane based on the velocity", function() {
    var s = Space();
    var ship = s.addEntity({
      type: "ship",
      velocity: 5,
      rotation: 90, x: 0, y: 0, update: function() {
        this.velocity -= 0.5;
      } });

    for (var i = 1000; i--;) s.update();

    expect(ship.x).to.be(30);
    expect(ship.y).to.be(0);
  });

  it("properly removes two entities that collide with one another", function(next) {
    var s = Space();
    var e1 = s.addEntity({ cid: 0, ype: "ship", width: 10, height: 10, x: 0, y: 0 });
    var e2 = s.addEntity({ cid: 0, type: "bullet", width: 10, height: 10, x: 10, y: 10 });

    var r1stub = sinon.spy(e1, "explode");
    var r2stub = sinon.spy(e2, "explode");

    e2.setProperties({ x: 0, y: 0 });

    s.update();

    expect(r1stub.callCount).to.be(1);
    expect(r2stub.callCount).to.be(1);
    next();
  });
});
