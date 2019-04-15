/**
 * This is the server.js. It handles the IO connections and keeps track of
 * the sockets and clients along with additional game information.
 */

const express = require("express");
const app = express();

// Clients
var clients = [];
var sockets = [];

// Spyfall Locations
var locations = [
  "Hospital",
  "Mountain",
  "Beach",
  "Theater",
  "Casino",
  "Circus",
  "Bank",
  "Spa",
  "Hotel",
  "Restaurant",
  "Supermarket",
  "Train Station",
  "Embassy",
  "Military Base",
  "Police Station",
  "School",
  "University",
  "Airplane",
  "Cruise",
  "Train",
  "Submarine",
  "Cathedral",
  "Corporate Party",
  "Movie Studio",
  "Crusader Army",
  "Pirate Ship",
  "Polar Station",
  "Space Station"
];

// Ports
const port = 8000;
const server = app.listen(port);
const io = require("socket.io")(server);
console.log("Listening to port", port);

// Variables
var inProgress = false;
var currentGame = null;

// On conncection
io.on("connection", socket => {
  sockets.push(socket);

  socket.on("get-list", () => {
    socket.emit("update-msg", { clients: clients });
  });

  socket.on("get-progress", () => {
    if (currentGame === "Mafia") {
      socket.emit("game", {
        inProgress: inProgress,
        game: "Mafia",
        additional: clients
      });
    } else {
      socket.emit("game", {
        inProgress: inProgress,
        game: "Spyfall",
        additional: locations
      });
    }
  });

  socket.on("submit-username", data => {
    if (
      clients.filter(c => c.username === data.username).length === 0 &&
      data.username !== "" &&
      data.username !== null
    ) {
      socket.username = data.username;
      clients.push({ username: data.username, role: null, socket: socket.id });
      socket.emit("username-result", { valid: true });
      console.log(socket.username + " has joined the room.");
      sockets.forEach(sock => {
        sock.emit("update-msg", { clients: clients });
      });
    } else {
      socket.emit("username-result", { valid: false });
    }
  });

  socket.on("start-mafia", () => {
    if (inProgress) {
      console.log("Game already in progress.");
    } else if (clients.length > 3) {
      inProgress = true;
      currentGame = "Mafia";
      shuffleArray(clients);
      chooseRolesMafia(clients);
      sendToSockets(clients);
    } else {
      console.log("Not enough players to start.");
    }
  });

  socket.on("start-spyfall", () => {
    if (inProgress) {
      console.log("Game already in progress.");
    } else if (clients.length > 2) {
      inProgress = true;
      currentGame = "Spyfall";
      shuffleArray(clients);
      chooseRolesSpyfall(clients);
      sendToSockets({
        locations: locations,
        location: locations[Math.floor(Math.random() * locations.length)]
      });
    } else {
      console.log("Not enough players to start.");
    }
  });

  socket.on("end-game", () => {
    if (inProgress) {
      inProgress = false;
      currentGame = null;
      sockets.forEach(sock => {
        sock.emit("game", {
          clients: clients,
          inProgress: inProgress,
          role: null,
          additional: null,
          game: currentGame
        });
      });
      console.log("Game has ended.");
    } else {
      console.log("There is no current game.");
    }
  });

  socket.on("disconnect", () => {
    if (socket.username != null) {
      console.log(socket.username + " has left the room.");
      clients.splice(
        clients.indexOf(clients.filter(c => c.socket === socket.id)[0]),
        1
      );
      sockets.splice(sockets.indexOf(socket), 1);
      sockets.forEach(sock => {
        sock.emit("update-msg", { clients: clients });
      });
    } else {
      sockets.splice(sockets.indexOf(socket), 1);
    }
  });

  // Helper Functions
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

  function chooseRolesMafia(array) {
    var mafias = Math.ceil(array.length / 6);
    var j = 0;
    for (; j < mafias; j++) {
      array[j].role = "Mafia";
    }
    array[j].role = "Nurse";
    array[j + 1].role = "Detective";
    for (var i = j + 2; i < array.length; i++) {
      array[i].role = "Civilian";
    }
  }

  function chooseRolesSpyfall(array) {
    array.map((a, i) => (i === 0 ? (a.role = "Spy") : (a.role = "Not Spy")));
  }

  function sendToSockets(add) {
    // Sends a message to each socket
    sockets.forEach(sock => {
      var temp = clients.filter(a => a.socket === sock.id);
      temp.length === 1
        ? // This means they are a logged in player
          sock.emit("game", {
            inProgress: inProgress,
            role: temp[0].role,
            game: currentGame,
            additional: add
          })
        : // This means they are not logged in
          sock.emit("game", {
            role: null,
            inProgress: inProgress,
            additional: add,
            game: currentGame
          });
    });
    console.log("Game has started.");
  }
});
