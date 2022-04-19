const userController = require("./../controllers/usersController");
const disciplineController = require("./../controllers/disciplinesController");
const preferenceController = require("./../controllers/preferencesController");
const institutionController = require("./../controllers/institutionsController");

const ROLE = require('./../models/roles');

module.exports = function(router) {
    router.get('/', userController.getDefault);
    router.post('/registerUser', userController.registerUser);
    router.post('/login', userController.login);
    router.get('/users', userController.getUsers);
    router.get('/user/:userID', userController.getUser);
    router.patch('/updateUser/:userID', userController.updateUser);
    router.put('/updateUserPassword/:userID', userController.updateUserPassword);
    router.put('/resetUserPassword', userController.resetPassword);
    router.delete('/deleteUser/:userID', userController.deleteUser);
    router.put('/discipline/:disciplineID/enroll', userController.enrollToDiscipline);
    router.put('/discipline/:disciplineID/unenroll', userController.unenrollFromDiscipline);
    router.get('/user/:userID/disciplines', userController.getUserDisciplines);
    router.get('/users/length', userController.getNumberOfUsers);

    //routes for discipline endpoints
    router.post('/addDiscipline', disciplineController.addDiscipline);
    router.get('/disciplines', disciplineController.getDisciplines);
    router.get('/specificDisciplines/:userID', disciplineController.getSpecificDisciplines);
    router.get('/discipline/:disciplineID', disciplineController.getDiscipline);
    router.patch('/updateDiscipline/:disciplineID', disciplineController.updateDiscipline);
    router.delete('/deleteDiscipline/:disciplineID', disciplineController.deleteDiscipline);
    router.get('/disciplines/length', disciplineController.getNumberOfDisciplines);

    //routes for preference endpoints
    router.post("/addPreference/:disciplineID", preferenceController.addDisciplinePreferences);
    router.get("/preferences", preferenceController.getPreferences);
    router.get("/preference/:preferenceID", preferenceController.getPreference);
    router.get("/preference/user/:userID/discipline/:disciplineID", preferenceController.getUserPreferenceByDiscipline);
    
    // router.patch("/updatePreference/:preferenceID", preferenceController.updatePreference);
    router.put("/preference/user/:userID/discipline/:disciplineID/update", preferenceController.updatePreference);
    router.patch("/user/:userID/discipline/:disciplineID", preferenceController.insertUserPreferences);
    router.put("/user/:userID/discipline/:disciplineID/reset", preferenceController.resetDisciplinePreference);
    router.delete("/preferences/discipline/:disciplineID/delete", preferenceController.deletePreferencesByDiscipline);

    //routes for institutions endpoints
    router.post("/institution/add", institutionController.addInstitution);
    router.get("/institutions", institutionController.getInstitutions);
    router.get("/institution/:institutionID", institutionController.getInstitution);
    router.patch("/institution/:institutionID/update", institutionController.updateInstitution);
    router.delete("/institution/:studyInstitution/delete", institutionController.deleteInstitution);
    router.get('/institutions/length', institutionController.getNumberOfInstitutions);
};
