var mesh   = require("mesh");
var extend = require("xtend/mutable");
var diff   = require("object-diff");

module.exports = {

  /**
  */

  initialize: function() {
    if (!this.isNew) {
      this.isNew = function() {
        return !this.data;
      }
    }

    this.watch(function() {
      this.update();
    }.bind(this));

    // var tail = this.bus(mesh.op("tail", {
    //   query: { cid: this.cid }
    // })).on("data", function(operation) {
    //   if (operation.name === "update") {
    //     this.setProperties(operation.data);
    //   } else if (operation.name === "remove") {
    //     this.dispose();
    //   }
    // }.bind(this));
    //
    // this.once("dispose", tail.end.bind(tail));
  },

  /**
  */

  save: function(onSave) {
    return this.isNew() ? this.insert(onSave) : this.update(onSave);
  },

  /**
  */

  insert: function(onSave) {
    if (!onSave) onSave = function() {}
    this.bus(mesh.op("insert", {
      data: this.toData(),
      remote: false
    })).on("end", onSave);
    return this;
  },

  /**
  */

  update: function(onSave) {
    if (!onSave) onSave = function() {}

    var newData;
    // var data = diff(this.data || {}, newData = this.toData());
    var data = this.toData();
    if(Object.keys(data).length > 0) {
      this.data = newData;
      this.bus(mesh.op("update", {
        query: { cid: this.cid },
        remote: false,
        data: data
      })).on("end", onSave);
    } else {
      onSave();
    }
    return this;
  },

  /**
  */

  remove: function(onRemove) {
    this.bus(mesh.op("remove", {
      query: { cid: this.cid },
      remote: false
    })).on("end", onRemove || function() {});
    this.dispose();
    return this;
  }
}
