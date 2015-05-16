var space  = require("./space");
var ship   = require("./ship");
var group  = require("./group");
var expect = require("expect.js");

describe(__filename + "#", function() {

  it("can be created", function() {
    space();
  });

  it("has a default entities property", function() {
    var s = space();
    expect(s.entities.items.length).to.be(0);
  });

  it("can take entities as a constructor property", function() {
    var e = group();
    var s = space(e);
    e.add({});
    expect(s.entities.items.length).to.be(1);
  });

  it("updates the entity X position", function() {
    var e  = group();
    var sh = ship({ x: 0, y: 0, rotation: 0 });
    e.add(sh);
    var s = space(e);
    for (var i = 10; i--;) s.update();
  });
});
