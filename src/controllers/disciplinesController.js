const Disciplines = require("../models/discipline");

//only admins can add disciplines
exports.addDiscipline = (req, res) => {
    let disciplineName = req.body.name;
    let discipline = new Disciplines();
    discipline.name = disciplineName;
    discipline.save({}, function(err) {
        if(err)
            res.send(err);
        res.status(201).send(`Discipline ${disciplineName} created successfuly`);
    });
}

exports.getDisciplines = (req, res) => {
    Disciplines.find({}, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    });
}

exports.getDiscipline = (req, res) => {
    let disciplineID = req.params.disciplineID;

    Disciplines.findById(disciplineID, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

//think there's need of separate update discipline timetable endpoint
exports.updateDiscipline = (req, res) => {
    let disciplineID = req.params.disciplineID;
    let disciplineDetails = req.body;
    let query = { _id: disciplineID };
    let data = { $push: disciplineDetails };
    Disciplines.updateOne(query, data, (err, docs) => {
        if(err)
            res.send(err);
        res.status(201).send(`Updated discipline details`);
    });
}

exports.deleteDiscipline = (req, res) => {
    let disciplineID = req.params.disciplineID;
    Disciplines.deleteOne({ _id: disciplineID }, (err, result) => {
        if(err)
            res.send(err);
        res.status(201).send('Deleted discipline');
    });
}