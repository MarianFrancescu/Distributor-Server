const Disciplines = require("../models/discipline");

//only admins can add disciplines
exports.addDiscipline = function(req, res) {
    let disciplineName = req.body.name;
    let discipline = new Disciplines();
    discipline.name = disciplineName;
    discipline.save({}, function(err) {
        if(err)
            res.send(err);
        res.status(201).send(`Subject ${disciplineName} created successfuly`);
    });
}

exports.getDisciplines = function(req, res) {
    Disciplines.find({}, function(err, results){
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    });
}

exports.getDiscipline = function(req, res) {
    let disciplineID = req.params.disciplineID;

    Disciplines.findById(disciplineID, function(err, results){
        if(err){
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

exports.updateDiscipline = function(req, res) {
    let disciplineID = req.params.disciplineID;
    let disciplineDetails = req.body;
    let query = { _id: disciplineID };
    let data = { $set: disciplineDetails };
    Disciplines.updateOne(query, data, function(err, docs) {
        if(err)
            res.send(err);
        res.status(201).send(`Updated discipline details`);
    });
}

exports.deleteDiscipline = function(req, res) {
    let disciplineID = req.params.disciplineID;
    Disciplines.deleteOne({ _id: disciplineID }, function(err, result) {
        if(err)
            res.send(err);
        res.status(201).send('Deleted discipline');
    });
}