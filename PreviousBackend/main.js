
var config = require('./db/firebaseDB');
//Controllers

const userController =   require('./controllers/user.controller');

const topStatsController =   require('./controllers/topstats.controller');

const weaponsController =   require('./controllers/weapons.controller');

const mapsController =   require('./controllers/map.controller');

// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
//Sockets

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

// Socket setup
//const io = socket(server);


// Middleware
app.use(bodyParser.json());

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is running on port ${PORT}.`);
    }
});

//Socket IO

io.on("connection", function (socket) {
    console.log("Socket : " + socket.id + " has connected");

    socket.on('create_test', (message) => {
        userController.login(null, function(err, user) {
            if (err){
                console.log(err);
            }
            else{
                socket.emit("all_test", user);
            }
        });
    });

    socket.on("disconnect", () => {
        console.log("User : " + socket.id + " has disconnect");
    });

  });