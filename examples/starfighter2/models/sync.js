var Base   = require("./base");
var _nonew = require("./_nonew");
var mesh   = require("mesh");
var group  = require("./group");
var sift   = require("sift");
var extend = require("xtend/mutable");

/**
 */

function Sync(properties) {
  Base.call(this, properties);
  if (!this.entities) this.entities = group();
  this.initialize();

}

/**
 */

Base.extend(Sync, {

  /**
   */

  initialize: function() {
    this._freeze();
    this._tailInserts();
  },

  /**
   */

  update: function() {
    this._pushChanges();
    this._pullChanges();
  },

  /**
   */

  _pushChanges: function() {
    var changes = this._diff(this._cache, this._freeze());

    // TODO - debounce this
    for (var action in changes) {
      var items = changes[action];
      for (var i = items.length; i--;) {
        var item = items[i];
        if (action === "insert") {
          this.bus(mesh.op(action, {
            data: item
          }));
        } else {
          this.bus(mesh.op(action, {
            query: { cid: item.cid },
            data: action === "update" ? item : void 0
          }));
        }
      }
    }
  },

  /**
   */

  _pullChanges: function() {
    
    for (var i = 0, n = this._remoteOps.length; i < n; i++) {
      var op = this._remoteOps[i];

      if (op.name === "insert") {
        this.entities.add(this.createItem(op.data));
      } else {
        var items = sift(op.query, this.entities.items);
        if (!items.length) return;
        if (op.name === "remove") {
          items[0].dispose();
        } else if (op.name === "update") {
          extend(items[0], op.data);
        }
      }
    }

    this._remoteOps = [];
  },

  /**
   */

  _tailInserts: function() {
    this._remoteOps = [];
    this._tail = this.bus(mesh.op("tail")).on("data", this._remoteOps.push.bind(this._remoteOps));
  },

  /**
   */

  _diff: function(a, b) {
    var changes = {
      insert: [],
      remove: [],
      update: []
    };

    for (var ak in a) {

      if (!b[ak]) {
        changes.remove.push(a[ak]);

      } else if (_changed(b[ak], a[ak])) {
        changes.update.push(a[ak]);
      }
    }

    for (var bk in b) {
      if (!a[bk]) {
        changes.insert.push(b[bk]);
      }
    }

    return changes;
  },

  /**
   */

  _freeze: function() {
    return this._cache = this._serializeEntities();
  },

  /**
   */

  _serializeEntities: function() {

    var data = {};
    var items = this.entities.getItems();

    for (var i = items.length; i--;) {
      var item  = items[i];
      data[item.cid] = item.toJSON();
    }

    return data;
  }
});

/**
 */

function _changed(a, b) {

  var ak = Object.keys(a);
  var bk = Object.keys(b);
  if (ak.length !== bk.length) return true;
  for (var i = ak.length; i--;) {
    var k = ak[i];
    if (a[k] !== b[k]) return true;
  }
  return false;
}

/**
 */

module.exports = _nonew(Sync);
