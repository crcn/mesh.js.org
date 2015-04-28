var mesh   = require("mesh");
var caplet = require("caplet");
var mixin  = require("./collection");
var expect = require("expect.js");

describe(__filename + "#", function() {

  var Collection = caplet.createCollectionClass({
    mixins: [mixin]
  });

  var fakeBus = mesh.tailable(mesh.wrap(function(operation, next) {
    next(void 0, operation.data);
  }));

  it("sync insert tails on the collection", function(next) {
    var c = Collection({ bus: fakeBus });

    fakeBus(mesh.op("insert", {
      data: {
        name: "blarg"
      }
    })).on("end", function() {
      expect(c.at(0).name).to.be("blarg");
      next();
    });
  });

  it("sync remove tails on the collection", function(next) {

    var Model = caplet.createModelClass({
    });

    var c = Collection({ modelClass: Model, bus: fakeBus, data: [{ name: "blarg" }, { name: "blarg" }] });
    fakeBus(mesh.op("remove", {
      query: { name: "blarg" }
    })).on("end", function() {
      expect(c.length).to.be(1);
      next();
    });
  });

  it("sync updates tails on the collection", function(next) {

    var c = Collection({  bus: fakeBus, data: [{ name: "blarg" }] });
    fakeBus(mesh.op("update", {
      query: { name: "blarg" },
      data: { age: 99 }
    })).on("end", function() {
      expect(c.at(0).age).to.be(99);
      next();
    });
  });

  it("removes tails when the collection is disposed", function(next) {
    var c = Collection({ bus: fakeBus });

    // collection must be disposed asynchronously for now
    setTimeout(function() {

      c.dispose();
      fakeBus(mesh.op("insert", {
        query: {
          name: "blarg"
        }
      })).on("end", function() {

        expect(c.length).to.be(0);
        next();
      });
    }, 10)
  });

  it("can load a collection", function(next) {
    var c = Collection({
      bus: mesh.wrap(function(operation, next) {
        next(void 0, [1, 2, 3, 4]);
      })
    })

    c.load(function() {
      expect(c.length).to.be(4);
      next();
    });
  });

  xit("can catch load errors", function(next) {
    var c = Collection({
      bus: mesh.wrap(function(operation, next) {
        next(new Error("fail"));
      })
    })

    c.load(function(err) {
      expect(err.message).to.be("fail");
      next();
    });
  });

  it("passes the bus to each created model", function() {
    var c = Collection({
      bus: mesh.wrap(function() {})
    });

    var m = c.createModel();
    expect(m.bus).to.be(c.bus);
  });

  it("synchronizes removes when multi=true", function(next) {
    var c = Collection({
      data: [{ count: 1 }, { count: 1 }, { count: 2 }],
      bus: fakeBus
    });

    c.bus(mesh.op("remove", {
      multi: true,
      query: { count: 1 }
    })).on("end", function() {
      expect(c.length).to.be(1);
      next();
    });
  });

  it("synchronizes updates when multi=true", function(next) {
    var c = Collection({
      data: [{ count: 1 }, { count: 1 }, { count: 2 }],
      bus: fakeBus
    });

    c.bus(mesh.op("update", {
      multi: true,
      query: { count: 1 },
      data: { count: 3 }
    })).on("end", function() {
      expect(c.at(0).count).to.be(3);
      expect(c.at(1).count).to.be(3);
      expect(c.at(2).count).to.be(2);
      next();
    });
  });

});
