var User   = require("./user-model");
var expect = require("expect.js");
var extend = require("extend");
var mesh   = require("mesh");

describe("user-model#", function() {

  var fakeBus;
  var ops = [];

  beforeEach(function(next) {
    fakeBus = mesh.wrap(function(operation, next) {
      ops.push(operation);
      next.apply(void 0, operation.data || [])
    });
  });

  it("can insert() a user", function(complete) {

    var user = new User({
      name: "Kung Fury",
      emailAddress: "nin@jitsu.com",
      bus: fakeBus
    });

    user.insert(function() {
      expect(ops.length).to.be(1);
      epect(ops[0].name).to.be("insert");
      epect(ops[0].data.name).to.be("Kung Fury");
      epect(ops[0].data.emailAddress).to.be("nin@jitsu.com");
      complete();
    });
  })
});
