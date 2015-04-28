var mesh   = require("mesh");
var caplet = require("caplet");
var mixin  = require("./model");
var expect = require("expect.js");

describe(__filename + "#", function() {

  var Model = caplet.createModelClass({
    mixins: [mixin]
  });


  it("inserts a model if a GUID does not exist", function(next) {

    var m = Model({
      bus: mesh.wrap(function(operation) {
        expect(operation.name).to.be("insert");
        next();
      })
    });

    m.save();
  });

  it("updates a model if a GUID does not exist", function(next) {

    var m = Model({
      data: { },
      bus: mesh.wrap(function(operation) {
        expect(operation.name).to.be("update");
        expect(operation.model).to.be(m);
        next();
      })
    });

    m.save();
  });

  it("calls save callback", function(next) {
    var m = Model({
      bus: mesh.wrap(function(operation, next) {
        next();
      })
    });

    m.save(next);
  });

  it("properly binds saved data to the model", function(next) {
    var m = Model({
      bus: mesh.wrap(function(operation, next) {
        next(void 0, { guid: "1234" });
      })
    });

    m.save(function() {
      expect(m.guid).to.be("1234");
      next();
    });
  });

  it("properly handles errors", function(next) {
    var m = Model({
      bus: mesh.wrap(function(operation, next) {
        next(new Error("fail"));
      })
    });

    m.save(function(err) {
      expect(err.message).to.be("fail");
      next();
    });
  });

  it("can properly load the model", function(next) {
    var m = Model({
      bus: mesh.wrap(function(operation, next) {
        next(void 0, { guid: "1234" });
      })
    });

    m.load(function(err) {
      expect(m.guid).to.be("1234");
      next();
    });
  });

  it("can properly remove the model", function(next) {
    var m = Model({
      bus: mesh.wrap(function(operation) {
        expect(operation.name).to.be("remove");
        next();
      })
    });
    m.remove();
  });
});
