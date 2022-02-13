const Users = require('./../models/users');
const jwt = require('jsonwebtoken');
const emailService = require('./../services/EmailService');
const bcrypt = require("bcryptjs");
const salt = 6;

exports.getDefault = function(req, res) {
    res.send("You are on root route");
};

exports.getUsers = function(req, res) {
    Users.find({}, function(err, results){
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    });
};

exports.getUser = function(req, res) {
    let userID = req.params.userID;
    Users.findById(userID, function(err, results){
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

//needs work
exports.updateUserPassword = function(req, res) {
    let userID = req.body.userID;
    let newPassword = bcrypt.hashSync(req.body.newPassword, salt);
    let query = { userID: userID };
    let data = { $set: { password: newPassword }};
    Users.updateOne(query, data, function(err, result) {
        if(err)
            res.send(err);
        res.status(201).send(`Updated user password`);
    });
}

exports.registerUser = async function(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, salt);

    let user = await Users.findOne({email: req.body.email});

    if(user){
        return res.status(400).send("User already exists!");
    } else{
        user = new Users();
        user.email = email;
        user.username = username;
        user.password = password;
        emailService.sendCredentialEmail(username, email);
        await user.save({}, function(err){
            if(err)
                res.end(err);
            res.status(201).send(`Succesfully created account for ${email}`);
        });
    }
};

exports.login = function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    Users.find({email: email}, function(err, result){
        if(err){
            res.send(err);
        }

        if(bcrypt.compareSync(password, result[0].password)){
            jwt.sign({
                email: result[0].email,
                userID: result[0]._id
            }, 
                "secret", //secret is the key of the token
                {expiresIn: '1h'}, 
                function(err, token) {
                    if(err)
                        throw err;
                    res.send({token: token})
            });
        } else {
            res.send({status: "Login failed"});
        }
    });
}