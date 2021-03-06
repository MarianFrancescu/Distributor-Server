const Disciplines = require("../models/discipline");
const Users = require('./../models/users');
const Preferences = require('./../models/preference');

exports.addDisciplinePreferences = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.body.userID;
    let options = req.body.options;
    let preference = new Preferences();
    preference.userID = userID;
    preference.disciplineID = disciplineID;
    preference.options = options;
    preference.save({}, (err) => {
        if(err)
            res.send(err);
        res.status(201).send(`Preference saved successfully`);
    });
}

exports.getPreferences = (req, res) => {
    Preferences.find({}, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

exports.getPreference = (req, res) => {
    let preferenceID = req.params.preferenceID;

    Preferences.findById(preferenceID, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

exports.getUserPreferenceByDiscipline = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.params.userID;

    Preferences.findOne({userID: userID, disciplineID: disciplineID}, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

// exports.updatePreference = (req, res) => {
//     let preferenceID = req.params.preferenceID;
//     let preferenceDetails = req.body;
//     let query = { _id: preferenceID };
//     let data = { $set: preferenceDetails };
//     Preferences.updateOne(query, data, (err, docs) => {
//         if(err)
//             res.send(err);
//         res.status(201).send(`Updated preference details`);
//     });
// }

exports.updatePreference = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.params.userID;
    let preferenceDetails = req.body.options;
    let query = { userID: userID, disciplineID: disciplineID };
    let data = { $set: {options: preferenceDetails} };
    Preferences.updateOne(query, data, (err, docs) => {
        if(err)
            res.status(503).send("Server error");
        res.status(201).send(`Updated preference details`);
    });
}

exports.resetDisciplinePreference = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.params.userID;

    let query = { "_id": disciplineID };
    let data = { $pull: { "timetable.$[].students": userID } };
    Disciplines.updateOne(query, data, (err, docs) => {
        if(err)
            res.status(502).send(err);
        res.status(201).send(`Updated discipline details`);
    });    
}

exports.deletePreferencesByDiscipline = (req, res) => {
    let disciplineID = req.params.disciplineID;

    let query = { "disciplineID": disciplineID };
    Preferences.deleteMany(query, (err, docs) => {
        if(err)
            res.status(502).send(err);
        res.status(201).send(`Deleted discipline preferences`);
    });    
}

exports.insertUserPreferences = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.params.userID;

    Preferences.findOne({userID: userID, disciplineID: disciplineID}, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        let userOptions = [];
        userOptions = (results.options);

        Disciplines.findById(disciplineID, (err, result) => {
            if(err){
                console.log(err);
            }

            const resultsTimetable = result.timetable.filter(elem => elem.students.length < result.maxNoOfStudentsPerTimetable);
            const timetableRes = resultsTimetable.map(val => val.option);
            const resultElem = userOptions.find(val => timetableRes.includes(val))

            let timetableDetails = {
                option: resultElem,
                students: userID            
            };
    
            let query = { "_id": disciplineID, "timetable.option": timetableDetails.option };
            let data = { $addToSet: { "timetable.$.students": timetableDetails.students} };
            Disciplines.updateOne(query, data, (err, docs) => {
                if(err)
                    res.send(err);
                res.status(201).send(`Updated discipline details`);
            });
        });
        
    });
}