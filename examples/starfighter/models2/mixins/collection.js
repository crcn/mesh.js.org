var mesh   = require("mesh");
var _      = require("highland");
var sift   = require("sift");
var extend = require("xtend/mutable");

/**
 */

module.exports = {

  /**
   */

  onCreateModel: function(model) {
    model.bus = this.bus;
  },

  /**
   */

  initialize: function() {
    var tail = this.bus(mesh.op("tail")).on("data", _syncCollection(this));
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
    .on("data", this.set.bind(this, "data"))
    .once("end", onLoad);
    return this;
  }
};

/**
 * synchronizes collections with tailed operations from the service
 * bus
 */

function _syncCollection(collection) {
  return function(operation) {

    var handler = ({
      insert  : insert,
      remove  : remove,
      update  : update
    })[operation.name] || noop;
    handler(operation);
  };

  function insert(operation) {
    // console.log(operation.data);
    collection.push.apply(collection, _toArray(operation.data).map(_createModel));
  }

  function remove(operation) {
    _find(operation).forEach(function(model) {
      collection.splice(collection.indexOf(model), 1);
      model.dispose();
    });
  }

  function update(operation) {
    _find(operation).forEach(function(model) {
      model.set("data", extend({}, model.data, operation.data));
    });
  }

  function _find(operation) {
    var query = operation.query;
    var filter;

    if (!query && operation.data) {
      filter = function(model) {
        return model.data.cid === operation.data.cid;
      }
    } else {
      filter = sift({ data: query });
    }

    var models = collection.filter(filter);
    if (!operation.multi && !!models.length) models = [models[0]];
    return models;
  }

  function _createModel(data) {
    return collection.createModel({ data: data });
  }

  function noop(operation) {
    // do nothing
  }
};

/**
 */

function _toArray(data) {
  if (data == void 0) return [];
  return Object.prototype.toString.call(data) === "[object Array]" ? data : [data];
}
