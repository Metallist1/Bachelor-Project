import { createRequire } from 'module'
const require = createRequire(import.meta.url);

//Controllers
import { login, addPlayer, disconnectPlayer,register } from './controllers/user.controller.js'

// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3002;
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

io.on("connection", function (socket) {

    console.log("Socket : " + socket.id + " has connected");

    socket.on('login', (message) => {
        console.log(message);
        login(message, function(err, user) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                console.dir(user, { depth: null }); // `depth: null` ensures unlimited recursion
                console.log("Logged in user");
                const postData = {
                    user: user,
                    socketID: socket.id
                };
                addPlayer(postData, function(err) {
                    if (err){
                        console.log(err);
                    }
                    else{
                       
                    }
                });
                socket.emit("logged_in", user);
            }
        });
    });

    socket.on('register', (message) => {
        console.log(message);
        register(message, function(err, user) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                console.dir(user, { depth: null }); // `depth: null` ensures unlimited recursion
                console.log("Registered");
                const postData = {
                    user: user,
                    socketID: socket.id
                };
                addPlayer(postData, function(err) {
                    if (err){
                        console.log(err);
                    }
                    else{
                      
                    }
                });
                socket.emit("logged_in", user);
            }
        });
    });

    socket.on("disconnect", () => {
        disconnectPlayer(socket.id, function(err, allUsers) {
            if (err){
                console.log(err);
            }
            else{
                
            }
        });
        console.log("User : " + socket.id + " has disconnect");
    });

  });