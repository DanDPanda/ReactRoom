const express = require("express");
const app = express();

// Clients
var clients = [];
var sockets = [];

// Variables
var inProgress = false;

// Ports
const port = 8000;
const server = app.listen(port);
const io = require("socket.io")(server);
console.log("Listening to port", port);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.get("/start", (req, res) => {
  inProgress = true;
  clients[0].role = "Mafia";
  clients[1].role = "Nurse";
  clients[2].role = "Detective";
  sockets.forEach(sock => {
    for (var i = 0; i < clients.length; i++) {
      if (sock.id == clients[i].socket) {
        sock.emit("game-start", {
          clients: clients,
          inProgress: inProgress,
          role: clients[i].role
        });
        i = clients.length;
      }
    }
  });
  console.log("Game has started.");
  res.send("Game has started.");
});

app.get("/restart", (req, res) => {
  inProgress = false;
  sockets.forEach(sock => {
    sock.emit("restart", {
      clients: clients,
      inProgress: inProgress,
      role: ""
    });
  });
  res.send("Game has ended.");
});

// On conncection
io.on("connection", socket => {
  sockets.push(socket);

  socket.on("get-list", () => {
    socket.emit("update-msg", { clients: clients });
  });

  socket.on("get-progress", () => {
    socket.emit("game-start", { clients: clients, inProgress: inProgress });
  });

  socket.on("submit-username", data => {
    if (clients.indexOf(data.username) < 0 && data.username !== "") {
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
