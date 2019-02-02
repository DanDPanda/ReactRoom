const express = require("express");
const app = express();

// Clients
var clients = [];
var sockets = [];

// Spyfall Locations
var locations = ["School", "Hospital", "Mountain"];

// Ports
const port = 8000;
const server = app.listen(port);
const io = require("socket.io")(server);
console.log("Listening to port", port);

require("./routes").func(app, clients, sockets, locations);

// On conncection
io.on("connection", socket => {
  sockets.push(socket);

  socket.on("get-list", () => {
    socket.emit("update-msg", { clients: clients });
  });

  socket.on("get-progress", () => {
    if (require("./routes").getGame() === "Mafia") {
      socket.emit("game", {
        inProgress: require("./routes").getProgress(),
        game: "Mafia",
        additional: clients
      });
    } else {
      socket.emit("game", {
        inProgress: require("./routes").getProgress(),
        game: "Spyfall",
        additional: locations
      });
    }
  });

  socket.on("submit-username", data => {
    if (
      clients.filter(c => c.username === data.username).length === 0 &&
      data.username !== ""
    ) {
      socket.username = data.username;
      clients.push({ username: data.username, role: "", socket: socket.id });
      socket.emit("username-result", { valid: true });
      console.log(socket.username + " has joined the room.");
      sockets.forEach(sock => {
        sock.emit("update-msg", { clients: clients });
      });
    } else {
      socket.emit("username-result", { valid: false });
    }
  });

  socket.on("disconnect", () => {
    if (socket.username != null) {
      console.log(socket.username + " has left the room.");
      var i = clients.indexOf(clients.filter(c => c.socket === socket.id)[0]);
      var j = sockets.indexOf(socket);
      clients.splice(i, 1);
      sockets.splice(j, i);
      sockets.forEach(sock => {
        sock.emit("update-msg", { clients: clients });
      });
    }
  });
});
