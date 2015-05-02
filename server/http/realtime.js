var io     = require("socket.io");
var iowc   = require("socketio-wildcard");
var mesh   = require("mesh");
var mio    = require("mesh-socket.io");
var memory = require("mesh-memory");
var extend = require("xtend/mutable");
var sift   = require("sift");

module.exports = function(server, app) {
  var ioserver = app.ioserver = io(server);
  //
  // ioserver.on("connection", function(connection) {
  //
  //   var db = {};
  //
  //   var ubus = mesh.tailable(memory({ db: db }));
  //   // ubus(mesh.op("tail")).pipe(mesh.open(mesh.reject(sift({ remote: true }), app.bus)));
  //   ubus(mesh.op("tail")).pipe(mesh.open(app.bus));
  //   connection.on("disconnect", function() {
  //
  //     // clean up data from the user
  //     for (var c in db) {
  //       (function(c) {
  //         ubus(mesh.op("load", {
  //           collection: c,
  //           multi: true
  //         })).on("data", function(item) {
  //           ubus(mesh.op("remove", { collection: c, query: { cid: item.cid }}))
  //         });
  //       })(c);
  //     }
  //
  //     tail.end();
  //   });
  //
  //
  //   tail = app.bus(mesh.op("tail")).on("data", function(op) {
  //     if (!op.collection in db) return;
  //     connection.broadcast.emit(op.channel, op);
  //   });
  //
  //   var _busses = {};
  //
  //   function _getBus(channel, connection) {
  //     return _busses[channel] || (_busses[channel] = io({
  //       channel : channel,
  //       client  : connection
  //     }, ubus))
  //   }
  //
  //   connection.on("*", function (message) {
  //
  //     var channel   = message.data[0];
  //     var operation = message.data[1];
  //     operation.channel = channel;
  //
  //     ubus(operation);
  //
  //     var b = _getBus(channel, connection);
  //     b(operation);
  //   });
  // });
}
