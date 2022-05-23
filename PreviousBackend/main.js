

app.post('/event', function (req, res) {
    let change = req.body;
    console.log(change);
    eventType = change.event;
    switch(eventType) {
        case "Minor-Event":
            addMinorEvent(change, function(err, eventResult) {
                if (err){
                    console.log(err);
                }
                else{
                    res.send(eventResult);
                }
            });
            break;
        case "Movement-Event":
            addMovementEvent(change, function(err, eventResult) {
                if (err){
                    console.log(err);
                }
                else{
                    res.send(eventResult);
                }
            });
            break;
        case "Core-Event":
            addCoreEvent(change, function(err, eventResult) {
                if (err){
                    console.log(err);
                }
                else{
                    res.send(eventResult);
                }
            });
            break;
        default:
            res.status(400).send({
                message: 'No such event'
            });
      }
});

app.post('/endgame', function (req, res) {
    let change = req.body;
    console.log(change);
    eventType = change.event;
    addEndGameStats(change, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
    res.send({sensorId: id, value: value, measuretime: time});
});

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is running on port ${PORT}.`);
    }
});

//Socket IO
getAllPlayersOnline().subscribe((data) => {
    io.emit("current_player_count", data.length);
});

io.on("connection", function (socket) {

    console.log("Socket : " + socket.id + " has connected");
    getAllMaps(null, function(err, allMaps) {
        if (err){
            console.log(err);
            socket.emit("get_user_error", err);
        }
        else{
            socket.emit("all_maps", allMaps);
        }
    });
    getAllWeapons(null, function(err, all_weapons) {
        if (err){
            console.log(err);
            socket.emit("get_user_error", err);
        }
        else{
            socket.emit("all_weapons", all_weapons);
        }
    });

    getTopStats(null, function(err, general_statistics) {
        if (err){
            console.log(err);
            socket.emit("get_user_error", err);
        }
        else{
            socket.emit("general_statistics", general_statistics);
        }
    });

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
                        io.emit("all_users", getAllPlayersOnline());
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
                        io.emit("all_users", getAllPlayersOnline());
                    }
                });
                socket.emit("logged_in", user);
            }
        });
    });


    socket.on('get_statistics_by_map_id', (mapID) => {
        getMapStatistics(mapID.id, function(err, map_stat) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                socket.emit("map_statistics", map_stat);
            }
        });
    });

    socket.on('get_statistics_by_weapon_id', (loadoutID) => {
        getWeaponStatistics(loadoutID.id, function(err, weapon_stat) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                socket.emit("weapon_statistics", weapon_stat);
            }
        });
    });

    socket.on("disconnect", () => {
        disconnectPlayer(socket.id, function(err, allUsers) {
            if (err){
                console.log(err);
            }
            else{
                io.emit("all_users", allUsers);
            }
        });
        console.log("User : " + socket.id + " has disconnect");
    });

  });