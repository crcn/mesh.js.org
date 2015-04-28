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
  },


  /**
   */

  save: function(onSave) {
    return this.isNew() ? this.insert(onSave) : this.update(onSave);
  },

  /**
   */

   insert: function(onSave) {
    this._run("insert", onSave);
    return this;
  },

  /**
   */

   update: function(onSave) {
    this._run("update", onSave);
    return this;
  },

  /**
   */

  load: function(onLoad) {
    this._run("load", onLoad);
    return this;
  },

  /**
   */

  remove: function(onLoad) {
    this._run("remove", onLoad);
    return this;
  },

  /**
   */

  _run: function(operationName, onRun) {
    if (!onRun) onRun = function() { };
    var data = extend({}, this.data);

    // console.log(this.toData());;

    var stream = this
    .bus(mesh.op(operationName, {
      model: this
    }))
    .once("error", onRun)

    if (/load|insert/.test(operationName)) {
      stream
      .on("data", extend.bind(void 0, data))
      .once("end", this.set.bind(this, "data", data))
    }

    stream
    .once("end", onRun);
  }
}
