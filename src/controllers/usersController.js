const Users = require('./../models/users');
const jwt = require('jsonwebtoken');
const emailService = require('./../services/EmailService');
const bcrypt = require("bcryptjs");
const salt = 6;

exports.getDefault = function(req, res) {
    res.send("You are on root route");
};

exports.getUsers = function(req, res) {
    User.find({}, function(err, results){
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    });
};

exports.registerUser = function(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, salt);

    emailService.sendCredentialEmail(username, email);

    const User = new Users();
    User.email = email;
    User.username = username;
    User.password = password;
    User.save({}, function(err){
        if(err)
            res.end(err);
        res.end(`Created ${username}`);
    });
};