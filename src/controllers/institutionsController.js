const Institutions = require('../models/institution');

exports.addInstitution = async (req, res) => {
    let studyInstitution = req.body.studyInstitution;
    let faculties = req.body.faculties;

    let institution = await Institutions.findOne({studyInstitution: req.body.studyInstitution});

    if(institution){
        return res.status(400).send("Instititution already exists!");
    } else{
        let institution = new Institutions();
        institution.studyInstitution = studyInstitution;
        institution.faculties = faculties;
        await institution.save({}, (err) => {
            if(err)
                res.end(err);
            res.status(201).send(`Succesfully created institution ${studyInstitution}`);
        });
    }
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
    let studyInstitution = req.params.studyInstitution;
    Institutions.deleteOne({ studyInstitution: studyInstitution }, (err, result) => {
        if(err)
            res.send(err);
        res.status(201).send('Deleted discipline');
    });
}