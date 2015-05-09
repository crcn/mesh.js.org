var mesh   = require("mesh");
var _      = require("highland");
var sift   = require("sift");
var extend = require("xtend/mutable");

/**
 */

module.exports = {

  /**
   */

  initialize: function() {
    if (!this.bus) return;
    var tail = this.bus(mesh.op("tail")).on("data", this._onTail.bind(this));
    this.once("dispose", tail.end.bind(tail));
  },

  /**
   */

  load: function(onLoad) {
    if (!onLoad) onLoad = function() { };

    this.bus(mesh.op("load", {
      multi: true
    }))
    .pipe(_.pipeline(_.collect))
    .once("error", onLoad)
    .on("data", this.onLoad.bind(this))
    .once("end", onLoad);
    return this;
  },

  /**
   */

  onLoad: function(data) {
    data.map(function(item) {
      this._onInsert({ name: "insert", data: item });
    }.bind(this));
  },

  /**
   */

  _onTail: function(operation) {

    var handler = ({
      insert  : this._onInsert
    })[operation.name] || function() { };

    handler.call(this, operation);
  },

  /**
   */

  _onInsert: function(operation) {

    // make sure that the
    if (this._find(operation).length) {
      return;
    }

    this.push.apply(this, _toArray(operation.data).map(this.createModel.bind(this)));
  },

  /**
   */

  _find: function(operation) {
    var query = operation.query;
    var filter;

    if (!query && operation.data) {
      filter = function(model) {
        return model.cid === operation.data.cid;
      }
    } else {
      filter = sift(query);
    }

    var models = this.filter(filter);
    if (!operation.multi && !!models.length) models = [models[0]];
    return models;
  }
};


/**
 */

function _toArray(data) {
  if (data == void 0) return [];
  return Object.prototype.toString.call(data) === "[object Array]" ? data : [data];
}
