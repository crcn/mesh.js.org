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

    expect(space.x).to.be(-530);
    expect(space.y).to.be(30);

    ship.y = 1000;
    viewport.tick();
    expect(space.y).to.be(-530);

    ship.x = -1000;
    ship.y = -1000;
    viewport.tick();
    expect(space.x).to.be(-970);
    expect(space.y).to.be(-970);
  });

  it("can set the padding in the viewport", function() {
    var space = Space();

    var viewport = Viewport({
      width: 500,
      height: 500,
      space: space
    });

    var ship = space.addEntity({
      x: 0,
      y: 0,
      type: "ship"
    });

    viewport.focus = ship;
    viewport.tick();
    expect(space.x).to.be(30);
    expect(space.y).to.be(30);
    viewport.padding = 10;
    viewport.tick();
    expect(space.x).to.be(10);
    expect(space.y).to.be(10);
  });
});
