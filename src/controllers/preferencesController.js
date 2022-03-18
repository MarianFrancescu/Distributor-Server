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
        res.status(201).send(`Preference saved successfuly`);
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

exports.insertUserPreferences = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let userID = req.params.userID;

    Preferences.findOne({userID: userID, disciplineID: disciplineID}, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        let userOptions = [];
        userOptions = (results.options);

        
        let index = 0;

        Disciplines.findById(disciplineID, (err, result) => {
            if(err){
                console.log(err);
            }
            
            result.timetable.forEach(element => {
                if(element.option === userOptions[index]){
                    if(element.students.length < 2)
                        console.log(2);
                    else {
                        index++;
                    }
                    // console.log(index);
                }
                //log that option not exists
            });

            let timetableDetails = {
                option: userOptions[index],
                students: userID            
            };
            console.log(timetableDetails.option);
    
            let query = { "_id": disciplineID, "timetable.option": timetableDetails.option };
            let data = { $addToSet: { "timetable.$.students": timetableDetails.students} };
            Disciplines.updateOne(query, data, (err, docs) => {
                if(err)
                    res.send(err);
                res.status(201).send(`Updated discipline details`);
            });
        });
        
    });
    // retrieveUser(userID, disciplineID, res, function(err, options) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     userOptions = options;
    //     console.log(userOptions);
    //   });

    

    // let query = { _id: disciplineID };
    // let data = { $set: disciplineDetails };
    // Disciplines.updateOne(query, data, function(err, docs) {
    //     if(err)
    //         res.send(err);
    //     res.status(201).send(`Updated discipline details`);
    // });
}