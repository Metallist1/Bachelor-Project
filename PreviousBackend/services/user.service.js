'use strict';

const usersRepository = require('../repositories/user.repositories');

let login = function(req, res) {
    usersRepository.login(req, function(err, user) {
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