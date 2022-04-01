const Institutions = require('../models/institution');

exports.addInstitution = (req, res) => {
    let studyInstitution = req.body.studyInstitution;
    let faculties = req.body.faculties;

    let institution = new Institutions();
    institution.studyInstitution = studyInstitution;
    institution.faculties = faculties;

    institution.save({}, function(err) {
        if(err)
            console.log(err)
        res.status(201).send(`Institution ${studyInstitution} created successfuly`);
    });
}

exports.getInstitutions = (req, res) => {
    Institutions.find({}, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.status(201).json(results);
    });
}

exports.getInstitution = (req, res) => {
    let institutionID = req.params.institutionID;

    Institutions.findById(institutionID, (err, results) => {
        if(err){
            res.status(503).send("Server error");
        }
        res.status(201).json(results);
    })
}

exports.updateInstitution = (req, res) => {
    let institutionID = req.params.institutionID;
    let institutionDetails = req.body;
    let query = { _id: institutionID };
    let data = { $set: institutionDetails };
    Institutions.updateOne(query, data, (err, docs) => {
        if(err)
            res.send(err);
        res.status(201).send(`Updated institution details`);
    });
}

exports.deleteInstitution = (req, res) => {
    let institutionID = req.params.institutionID;
    Institutions.deleteOne({ _id: institutionID }, (err, result) => {
        if(err)
            res.send(err);
        res.status(201).send('Deleted discipline');
    });
}