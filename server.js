const io = require("socket.io")();

// Clients
var clients = ["Dan", "Man"];
var sockets = [];

// Ports
const port = 8000;
io.listen(port);
console.log("Listening to port", port);

// On conncection
io.on("connection", socket => {
  // socket.on("submit_username", data => {
  // socket.username = data.username;
  // clients.push(data.username);
  // sockets.push(socket);
  // console.log(socket.username + " has joined the room.");
  // sockets.forEach(sock => {
  // console.log("Connection");
  socket.emit("update-msg", { clients: clients });
  // });
  // });

  socket.on("disconnect", () => {
    if (socket.username != null) {
      console.log(socket.username + " has left the room.");
      var i = clients.indexOf(socket.username);
      var j = sockets.indexOf(socket);
      clients.splice(i, 1);
      sockets.splice(j, i);
      sockets.forEach(sock => {
        sock.emit("update-msg", { data: clients });
      });
    }
  });
});
