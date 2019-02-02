/**
 * Routes.js maintains the routes to start and end the game.
 *
 * TODO: Issue #5
 */

// Variables
var inProgress = false;
var currentGame = null;

module.exports = {
  func: function(app, clients, sockets, locations) {
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

    function chooseRolesMafia(array) {
      var mafias = Math.ceil(array.length / 6);
      var j = 0;
      for (j = 0; j < mafias; j++) {
        array[j].role = "Mafia";
      }
      array[j].role = "Nurse";
      array[j + 1].role = "Detective";
      for (var i = j + 2; i < array.length; i++) {
        array[i].role = "Civilian";
      }
    }

    function chooseRolesSpyfall(array) {
      array = array.map((a, i) =>
        i === 0 ? (a.role = "Spy") : (a.role = "Not Spy")
      );
    }

    function sendToSockets(res, add) {
      sockets.forEach(sock => {
        var temp = clients.filter((a, i) => a.socket === sock.id);
        temp.length === 1
          ? sock.emit("game", {
              inProgress: inProgress,
              role: temp[0].role,
              game: currentGame,
              additional: add
            })
          : sock.emit("game", {
              role: null,
              inProgress: inProgress,
              additional: add,
              game: currentGame
            });
      });

      console.log("Game has started.");
      res.send("Game has started.");
    }

    // Routes
    app.get("/", (req, res) => {
      res.send("Hello World.");
    });

    app.get("/startMafia", (req, res) => {
      if (inProgress) {
        console.log("Game already in progress.");
        res.send("Game already in progress.");
      } else if (clients.length > 3) {
        inProgress = true;
        currentGame = "Mafia";
        shuffleArray(clients);
        chooseRolesMafia(clients);
        sendToSockets(res, clients);
      } else {
        console.log("Not enough players to start.");
        res.send("Not enough players to start.");
      }
    });

    app.get("/startSpyfall", (req, res) => {
      if (inProgress) {
        console.log("Game already in progress.");
        res.send("Game already in progress.");
      } else if (clients.length > 2) {
        inProgress = true;
        currentGame = "Spyfall";
        shuffleArray(clients);
        chooseRolesSpyfall(clients);
        sendToSockets(res, locations);
      } else {
        console.log("Not enough players to start.");
        res.send("Not enough players to start.");
      }
    });

    app.get("/restart", (req, res) => {
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
        res.send("Game has ended.");
      } else {
        console.log("There is no current game.");
        res.send("There is no current game.");
      }
    });
  },
  getProgress: function() {
    return inProgress;
  },
  getGame: function() {
    return currentGame;
  }
};
