var io     = require("socket.io");
var iowc   = require("socketio-wildcard");

module.exports = function(server) {
  var ioserver = io(server);
  ioserver.use(iowc());


  ioserver.on("connection", function(connection) {

    connection.on("*", function (message) {

      var channel   = message.data[0];
      var operation = message.data[1];

      connection.broadcast.emit(channel, operation);
    });

  });
}
