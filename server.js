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

// Functions
function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

function chooseRoles(array) {
  var mafias = Math.ceil(array.length / 5);
  var j = 0;
  for (j = 0; j < mafias; j++) {
    clients[j].role = "Mafia";
  }
  clients[j].role = "Nurse";
  clients[j + 1].role = "Detective";
  for (var i = j + 2; i < clients.length; i++) {
    clients[i].role = "Civilian";
  }
}

// Routes
app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.get("/startMafia", (req, res) => {
  if (clients.length > 3) {
    inProgress = true;
    shuffleArray(clients);
    chooseRoles(clients);
    sockets.forEach(sock => {
      var found = false;
      for (var i = 0; i < clients.length; i++) {
        if (sock.id === clients[i].socket) {
          sock.emit("game-start", {
            clients: clients,
            inProgress: inProgress,
            role: clients[i].role
          });
          found = true;
          i = clients.length;
        }
      }
      if (found === false) {
        sock.emit("game-start", {
          clients: clients,
          inProgress: inProgress
        });
      }
    });
    console.log("Game has started.");
    res.send("Game has started.");
  } else {
    console.log("Not enough players to start.");
    res.send("Not enough players to start.");
  }
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
  console.log("Game has ended.");
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
