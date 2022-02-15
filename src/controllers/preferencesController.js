const Disciplines = require("../models/discipline");
const Users = require('./../models/users');
const Preferences = require('./../models/preference');

exports.addDisciplinePreferences = function(req, res) {
    let disciplineID = req.params.disciplineID;
    let userID = req.body.userID;
    let options = req.body.options;
    let preference = new Preferences();
    preference.userID = userID;
    preference.disciplineID = disciplineID;
    preference.options = options;
    preference.save({}, function(err) {
        if(err)
            res.send(err);
        res.status(201).send(`Preference saved successfuly`);
    });
}

exports.getPreferences = function(req, res) {
    Preferences.find({}, function(err, results){
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

exports.getPreference = function(req, res) {
    let preferenceID = req.params.preferenceID;

    Preferences.findById(preferenceID, function(err, results){
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

exports.updatePreference = function(req, res) {
    let preferenceID = req.params.preferenceID;
    let preferenceDetails = req.body;
    let query = { _id: preferenceID };
    let data = { $set: preferenceDetails };
    Preferences.updateOne(query, data, function(err, docs) {
        if(err)
            res.send(err);
        res.status(201).send(`Updated preference details`);
    });
}