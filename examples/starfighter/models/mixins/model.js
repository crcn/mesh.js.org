var mesh   = require("mesh");
var extend = require("xtend/mutable");
var diff   = require("object-diff");

module.exports = {

  /**
  */

  initialize: function() {

    var self = this;

    var tail = this.bus(mesh.op("tail", {
      q: { "query.cid": this.cid }
    })).on("data", function(op) {
      this._locked = false;
      if (op.name === "update") {
        extend(this, op.data);
      } else if (op.name === "remove") {
        this.dispose();
      }
    }.bind(this));

    this.once("dispose", tail.end.bind(tail));
  },

  /**
  */

  insert: function(onSave) {
    if (!onSave) onSave = function() {}
    this.bus(mesh.op("insert", {
      data: this.toData()
    }))
    .on("error", onSave.bind(this))
    .on("end", onSave.bind(this, void 0, this));
    return this;
  },

  /**
  */

  update: function(properties, onSave) {

    if (!onSave) onSave = function() {}
    if (this._locked) return false;

    // no changes?
    if (!Object.keys(diff(this, properties)).length) {
      onSave();
      return false;
    }

    this._locked = true;

    this.bus(mesh.op("update", {
      query: { cid: this.cid },
      data: extend({ cid: this.cid }, properties)
    }))
    .on("error", onSave.bind(this))
    .on("end", onSave.bind(this, void 0, this))

    return true;
  },

  /**
  */

  remove: function(onRemove) {
    this.bus(mesh.op("remove", {
      query: { cid: this.cid }
    })).on("end", onRemove || function() {});
    return this;
  }
}
