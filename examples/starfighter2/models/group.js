var _nonew      = require("./_nonew");
var Base        = require("./base");

/**
 */

function Group(properties) {
  Base.call(this, properties);
  this.items = [];
}

/**
 */

Base.extend(Group, {

  /**
   * adds an item to the group
   */

  add: function() {
    this.items.push.apply(this.items, arguments);
    this._updateListeners();
  },

  /**
   * removes one item from the group
   */

  remove: function(item) {
    var i = this.items.indexOf(item);
    if (~i) {
      this.items.splice(i, 1);
      this._updateListeners();
    }
  },

  /**
   */

  update: function() {
    for (var i = this.items.length; i--;) {
      var item = this.items[i];
      item.update();
    }
  },

  /**
   */

  updateItem: function(item) {
    // do nothing
  },

  /**
   */

  _updateListeners: function() {

    var i;

    if (this._listenerDisposers) {
      for (i = this._listenerDisposers.length; i--;) {
        this._listenerDisposers[i]();
      }
    }

    this._listenerDisposers = [];

    this.items.forEach(function(item) {
      if (!item.__isObservable) return;

      var l1;
      var l2;

      item.on("dispose", l1 = this.remove.bind(this, item));
      item.on("child", l2 = this.add.bind(this));

      this._listenerDisposers.push(
        item.off.bind(item, "dispose", l1),
        item.off.bind(item, "child", l2)
      );

    }.bind(this));
  }
});

/**
 */

module.exports = _nonew(Group);
