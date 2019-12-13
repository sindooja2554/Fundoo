var userController =  require('../controller/userController');
var express = require('express');
var routes = express.Router();
var verify = require('../utility/jwtToken');

routes.post('/register', userController.createController);

routes.post('/login',userController.readController);

routes.get('/verify',verify.verifyToken,userController.isVerifiedController);

module.exports = routes;