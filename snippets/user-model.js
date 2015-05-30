
var mesh    = require("mesh");
var extend  = require("xtend/mutable");
var mongo   = require("mesh-mongodb");
var memory  = require("mesh-memory");
var loki    = require("mesh-loki");

function UserModel(properties) {
  extend(this, properties);
}

extend(UserModel.prototype, {
  insert: function(onInsert) {
    this.bus({ name: "insert", data: this.toJSON() })
      .on("data", extend.bind(void 0, this))
      .on("end", onInsert || function() { });
    };
  },
  toJSON: function() {
    return {
      _id          : this._id,
      name         : this.name,
      emailAddress : this.emailAddress
    }
  }
});

// var bus = memory();
// var bus = loki()
var bus = mongo({ host: "mongodb://127.0.0.1:27017/database" });

var user = new UserModel({
  name: "Mad Max",
  emailAddress: "mad@kindamad.com",
  bus: mesh.attach({ collection: "users" }, bus)
});

// insert user into mongodb, or any other database. The
// API is the same.
user.save();
