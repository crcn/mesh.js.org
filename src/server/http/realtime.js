var io     = require("socket.io");

module.exports = function(server, app) {
  var ioserver = app.sio = io(server);

  ioserver.on("connection", function(c) {
    c.on("operation", function(operation) {
      c.broadcast.emit("operation", operation);
    });
  });
}
