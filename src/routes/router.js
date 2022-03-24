const userController = require("./../controllers/usersController");
const disciplineController = require("./../controllers/disciplinesController");
const preferenceController = require("./../controllers/preferencesController");

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

    //routes for discipline endpoints
    router.post('/addDiscipline', disciplineController.addDiscipline);
    router.get('/disciplines', disciplineController.getDisciplines);
    router.get('/specificDisciplines/:userID', disciplineController.getSpecificDisciplines);
    router.get('/discipline/:disciplineID', disciplineController.getDiscipline);
    router.patch('/updateDiscipline/:disciplineID', disciplineController.updateDiscipline);
    router.delete('/deleteDiscipline/:disciplineID', disciplineController.deleteDiscipline);

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
};
