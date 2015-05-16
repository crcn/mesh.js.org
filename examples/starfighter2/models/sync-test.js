var sync   = require("./sync");
var expect = require("expect.js");
var group  = require("./group");
var ship   = require("./ship");
var mesh   = require("mesh");

describe(__filename + "#", function() {

  var fakeBus;
  var ops;

  beforeEach(function() {
    ops = [];
    fakeBus = mesh.wrap(function(operation, next) {
      ops.push(operation);
      next();
    });
  })

  it("can be created", function() {
    sync({ bus: mesh.noop });
  });

  it("properly syncs inserts", function(next) {
    var s = sync({ bus: fakeBus, entities: group() });
    s.entities.add(ship());

    s.update();

    setTimeout(function() {
      expect(ops.length).to.be(1);
      expect(ops[0].name).to.be("insert");
      next();
    }, 10);
  });

  it("properly syncs updates", function(next) {
    var s = sync({ bus: fakeBus, entities: group() });
    var sh = ship();
    s.entities.add(sh);
    s.update();
    sh.x = 100;
    s.update();

    setTimeout(function() {
      expect(ops.length).to.be(2);
      expect(ops[1].name).to.be("update");
      next();
    }, 10);
  });

  it("syncs removes", function(next) {
    var s = sync({ bus: fakeBus, entities: group() });
    var sh = ship();
    s.entities.add(sh);
    s.update();

    sh.dispose();
    s.update();

    setTimeout(function() {
      expect(ops.length).to.be(2);
      expect(ops[1].name).to.be("remove");
      next();
    }, 10);
  });
});
