const controller = require("./../controllers/usersController");

const ROLE = {
    SUPERADMIN: 'superAdmin',
    ADMIN: 'admin',
    BASIC: 'basic'
  }

module.exports = function(router) {
    router.get('/', controller.getDefault);
    router.post('/registerUser', controller.registerUser);
    router.post('/login', controller.login);
    router.get('/users', controller.getUsers);
    router.get('/getUser/:userID', controller.getUser);
    router.patch('/updateUser/:userID', controller.updateUser);
    router.put('/updateUserPassword/:userID', controller.updateUserPassword);
    router.delete('/deleteUser', controller.deleteUser);

};