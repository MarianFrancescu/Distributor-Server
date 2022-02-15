const userController = require("./../controllers/usersController");
const disciplineController = require("./../controllers/disciplinesController");

const ROLE = require('./../models/roles');

module.exports = function(router) {
    router.get('/', userController.getDefault);
    router.post('/registerUser', userController.registerUser);
    router.post('/login', userController.login);
    router.get('/users', userController.getUsers);
    router.get('/user/:userID', userController.getUser);
    router.patch('/updateUser/:userID', userController.updateUser);
    router.put('/updateUserPassword/:userID', userController.updateUserPassword);
    router.delete('/deleteUser', userController.deleteUser);
    router.put('/discipline/:disciplineID/enroll', userController.enrollToDiscipline);

    //routes for discipline endpoints
    router.post('/addDiscipline', disciplineController.addDiscipline);
    router.get('/disciplines', disciplineController.getDisciplines);
    router.get('/discipline/:disciplineID', disciplineController.getDiscipline);
    router.patch('/updateDiscipline/:disciplineID', disciplineController.updateDiscipline);
    router.delete('/deleteDiscipline/:disciplineID', disciplineController.deleteDiscipline);

};