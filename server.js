const io = require("socket.io")();

// Clients
var clients = [];
var sockets = [];

// Ports
const port = 8000;
io.listen(port);
console.log("Listening to port", port);

// On conncection
io.on("connection", socket => {
  sockets.push(socket);

  socket.on("get-list", () => {
    socket.emit("update-msg", { clients: clients });
  });

  socket.on("submit-username", data => {
    socket.username = data.username;
    clients.push(data.username);
    console.log(socket.username + " has joined the room.");
    sockets.forEach(sock => {
      sock.emit("update-msg", { clients: clients });
    });
  });

  socket.on("disconnect", () => {
    if (socket.username != null) {
      console.log(socket.username + " has left the room.");
      var i = clients.indexOf(socket.username);
      var j = sockets.indexOf(socket);
      clients.splice(i, 1);
      sockets.splice(j, i);
      sockets.forEach(sock => {
        sock.emit("update-msg", { clients: clients });
      });
    }
  });
});
