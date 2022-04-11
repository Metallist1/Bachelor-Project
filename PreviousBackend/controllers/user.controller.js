'use strict';

const usersService = require('../services/user.service');

let login = function(req, res) {
    usersService.login(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

module.exports = {
    login
}