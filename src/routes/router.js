const controller = require("./../controllers/usersController");

const ROLE = {
    SUPERADMIN: 'superAdmin',
    ADMIN: 'admin',
    BASIC: 'basic'
  }

module.exports = function(router) {
    router.get('/', controller.getDefault);
    router.get('/users', controller.getUsers);
    router.get('/getUser/:userID', controller.getUser);
    router.post('/registerUser', controller.registerUser);
    router.post('/login', controller.login);
};