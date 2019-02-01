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
        sockets.forEach(sock => {
          var found = false;
          for (var i = 0; i < clients.length; i++) {
            if (sock.id === clients[i].socket) {
              sock.emit("mafia-start", {
                inProgress: inProgress,
                role: clients[i].role,
                game: currentGame,
                additional: clients
              });
              found = true;
              i = clients.length;
            }
          }
          if (found === false) {
            sock.emit("mafia-start", {
              role: null,
              inProgress: inProgress,
              additional: clients,
              game: currentGame
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

    app.get("/startSpyfall", (req, res) => {
      if (inProgress) {
        console.log("Game already in progress.");
        res.send("Game already in progress.");
      } else if (clients.length > 2) {
        inProgress = true;
        currentGame = "Spyfall";
        shuffleArray(clients);
        chooseRolesSpyfall(clients);
        sockets.forEach(sock => {
          var found = false;
          for (var i = 0; i < clients.length; i++) {
            if (sock.id === clients[i].socket) {
              sock.emit("spyfall-start", {
                inProgress: inProgress,
                role: clients[i].role,
                game: currentGame,
                additional: locations
              });
              found = true;
              i = clients.length;
            }
          }
          if (found === false) {
            sock.emit("spyfall-start", {
              role: null,
              inProgress: inProgress,
              additional: locations,
              game: currentGame
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
          role: "",
          additional: null,
          game: ""
        });
      });
      console.log("Game has ended.");
      res.send("Game has ended.");
    });
  },
  getProgress: function() {
    return inProgress;
  },
  getGame: function() {
    return currentGame;
  }
};
