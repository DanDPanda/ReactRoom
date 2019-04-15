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
  "School",
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

  socket.on("start-mafia", data => {
    console.log(data.test);
  });

  socket.on("start-spyfall", data => {
    console.log(data.test);
  });

  socket.on("end-game", data => {
    console.log(data.test);
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
});
