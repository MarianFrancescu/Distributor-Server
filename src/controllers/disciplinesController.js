const Disciplines = require("../models/discipline");
const Users = require("../models/users");

//only admins can add disciplines
exports.addDiscipline = (req, res) => {
    let studyInstitution = req.body.studyInstitution;
    let faculty = req.body.faculty;
    let department = req.body.department;
    let studyYear = req.body.studyYear;
    let name = req.body.name;
    let teacher = req.body.teacher;
    let timetable = req.body.timetable;
    let maxNoOfStudentsPerTimetable = req.body.maxNoOfStudentsPerTimetable;
    
    let discipline = new Disciplines();
    discipline.name = name;
    discipline.teacher = teacher;
    discipline.studyInstitution = studyInstitution;
    discipline.faculty = faculty;
    discipline.department = department;
    discipline.studyYear = studyYear;
    discipline.timetable = timetable;
    discipline.maxNoOfStudentsPerTimetable = maxNoOfStudentsPerTimetable;

    discipline.save({}, function(err) {
        if(err)
            console.log(err)
        res.status(201).send(`Discipline ${name} created successfuly`);
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

exports.getSpecificDisciplines = async (req, res) => {
    let user = await Users.findOne({_id: req.params.userID});

    Disciplines.find({
        studyInstitution: user.studyInstitution,
        faculty: user.faculty,
        department: user.department,
        studyYear: user.studyYear
    }, (err, results) => {
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
    let data = { $set: disciplineDetails };
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

exports.getNumberOfDisciplines = (req, res) => {
    Disciplines.count({}, (err, result) => {
        if(err)
            res.status(503).send("Server error");
        else res.json(result);
    });
}