const Users = require('./../models/users');
const Disciplines = require('./../models/discipline');
const jwt = require('jsonwebtoken');
const emailService = require('./../services/EmailService');
const bcrypt = require("bcryptjs");
const salt = 6;

exports.getDefault = function(req, res) {
    res.send("You are on root route");
};

exports.getUsers = (req, res) => {
    Users.find({}, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    });
};

exports.getUser = (req, res) => {
    let userID = req.params.userID;
    Users.findById(userID, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

exports.updateUser = (req, res) => {
    let userID = req.params.userID;
    let userDetails = req.body;
    let query = { _id: userID };
    let data = { $set: userDetails };
    Users.updateOne(query, data, (err, docs) => {
        if(err){
                res.send(err);
            }
        res.status(200).send(`Updated user details`);
    });
}

exports.updateUserPassword = (req, res) => {
    let userID = req.params.userID;
    let newPassword = bcrypt.hashSync(req.body.newPassword, salt);
    let query = { _id: userID };
    let data = { $set: { password: newPassword }};
    Users.updateOne(query, data, (err, docs) => {
        if(err)
            res.send(err);
        res.status(200).send(`Updated user password`);
    });
}

exports.deleteUser = (req, res) => {
    let userID = req.params.userID;
    Users.deleteOne({ _id: userID }, (err, result) => {
        if(err)
            res.send(err);
        res.status(200).send('Deleted user');
    });
}

exports.registerUser = async (req, res) => {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let password = bcrypt.hashSync(req.body.password, salt);

    let user = await Users.findOne({email: req.body.email});

    if(user){
        return res.status(400).send("User already exists!");
    } else{
        user = new Users();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        emailService.sendCredentialEmail(`${firstName} + ${lastName}`, email);
        await user.save({}, (err) => {
            if(err)
                res.end(err);
            res.status(201).send(`Succesfully created account for ${email}`);
        });
    }
};

exports.resetPassword = async (req, res) => {
    let email = req.body.email;
    let user = await Users.findOne({email: req.body.email});

    if(!user){
        return res.status(400).send("User does not exist!");
    } else{
        let userID = user._id;
        let randomPassword = Math.random().toString(36).slice(-8);
        let newPassword = bcrypt.hashSync(randomPassword, salt);
        emailService.sendPasswordEmail(randomPassword, email);

        let query = { _id: userID };
        let data = { $set: { password: newPassword }};
        Users.updateOne(query, data, (err, docs) => {
            if(err)
                res.send(err);
            res.status(200).send(`Password was reset`);
        });
    }
};

exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await Users.findOne({email: email});
    
    if(user) {
        if(bcrypt.compareSync(password, user.password)){
            jwt.sign({
                email: user.email,
                userID: user._id
            },
                "secret", //secret is the key of the token
                {expiresIn: '1h'},
                (err, token) => {
                    if(err)
                        throw err;
                    res.send({
                        token: token,
                        userID: user._id,
                        role: user.role});
            });
        } else {
            res.status(401).send("Invalid password");
        }
    } else {
        res.status(401).send("User does not exist");
    }
}

exports.enrollToDiscipline = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.body.userID;

    let query = { _id: disciplineID };
    let data = { $addToSet: { students: userID }};

    Disciplines.updateOne(query, data, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.status(201).send(`Added student to discipline`);
    })
}

exports.unenrollFromDiscipline = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.body.userID;

    let query = { _id: disciplineID };
    let data = { $pull: { students: userID }};

    Disciplines.updateOne(query, data, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.status(201).send(`Removes student from discipline`);
    })
}

exports.getUserDisciplines = async (req, res) => {
    let userID = req.params.userID;

    Disciplines.find({
        students: { $all: userID }
    }, (err, results) => {
            if(err){
                console.log(err)
                res.status(503).send("Server error");
            }
            res.json(results);
    });
}
