var User   = require("./user-model");
var expect = require("expect.js");
var extend = require("extend");

describe("user-model#", function() {

  it("can insert() a user", function(complete) {

    var user = new User({
      name: "Kung Fury",
      emailAddress: "nin@jitsu.com",
      bus: mesh.wrap(function(operation, next) {
        next(void 0, extend({
          _id: "user1"
        }, operation.data));
      })
    });

    user.insert(function() {
      expect(user._id).to.be("user1");
      expect(user.name).to.be("Kung Fury");
      expect(user.emailAddress).to.be("nun@jitsu.com");
      complete();
    });
  })
});
