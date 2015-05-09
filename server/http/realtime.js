var io     = require("socket.io");

module.exports = function(server, app) {
  var ioserver = app.sio = io(server);
}
