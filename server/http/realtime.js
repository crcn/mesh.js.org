var io         = require("socket.io");
var iowc       = require("socketio-wildcard");

module.exports = function(server) {
  var ioserver = io(server);
  ioserver.use(iowc());

  ioserver.on("connection", function(connection) {

    connection.on("*", function (message) {
      connection.broadcast.emit(message.data[0], message.data[1]);
    });

  });
}
