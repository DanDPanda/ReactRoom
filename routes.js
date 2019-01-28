module.exports = function(app, clients, sockets, inProgress) {
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

  // Routes
  app.get("/", (req, res) => {
    res.send("Hello World.");
  });

  app.get("/startMafia", (req, res) => {
    if (clients.length > 3) {
      inProgress = true;
      shuffleArray(clients);
      chooseRolesMafia(clients);
      sockets.forEach(sock => {
        var found = false;
        for (var i = 0; i < clients.length; i++) {
          if (sock.id === clients[i].socket) {
            sock.emit("mafia-start", {
              clients: clients,
              inProgress: inProgress,
              role: clients[i].role
            });
            found = true;
            i = clients.length;
          }
        }
        if (found === false) {
          sock.emit("mafia-start", {
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
};
