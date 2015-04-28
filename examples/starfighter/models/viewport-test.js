var expect   = require("expect.js");
var Viewport = require("./viewport");
var Space    = require("./space");
var sinon    = require("sinon");

describe(__filename + "#", function() {

  it("can add a viewport", function() {
    Viewport();
  });

  it("can focus on a target and keep it within sight of the viewport", function() {
    var space = Space();

    var viewport = Viewport({
      width: 500,
      height: 500,
      space: space
    });

    var ship = space.addEntity({
      type: "ship"
    });

    viewport.focus = ship;

    ship.x = 1000;

    viewport.tick();

    expect(space.x).to.be(-600);
    expect(space.y).to.be(100);

    ship.y = 1000;
    viewport.tick();
    expect(space.y).to.be(-600);

    ship.x = -1000;
    ship.y = -1000;
    viewport.tick();
    expect(space.x).to.be(1100);
    expect(space.y).to.be(1100);
  });

  it("can set the padding in the viewport", function() {
    var space = Space();

    var viewport = Viewport({
      width: 100,
      height: 100,
      space: space
    });

    var ship = space.addEntity({
      x: 0,
      y: 0,
      type: "ship"
    });

    viewport.focus = ship;
    viewport.tick();
    expect(space.x).to.be(100);
    expect(space.y).to.be(100);
    viewport.padding = 10;
    viewport.tick();
    expect(space.x).to.be(90);
    expect(space.y).to.be(90);
  });

  it("returns TRUE if an entity is in view", function() {
    var space = Space();

    var viewport = Viewport({
      width: 100,
      height: 100,
      space: space
    });

    var ship = space.addEntity({
      x: 0,
      y: 0,
      type: "ship"
    });

    space.x = 1000;
    space.y = 1000;

    expect(viewport.canSee(ship)).to.be(false);
    space.x = 50;
    space.y = 50;
    expect(viewport.canSee(ship)).to.be(true);
    space.x = 1000;
    space.y = 50;
    expect(viewport.canSee(ship)).to.be(false);
    space.x = 50;
    space.y = 1000;
    expect(viewport.canSee(ship)).to.be(false);
  });
});
