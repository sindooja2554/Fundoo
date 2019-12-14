var userController =  require('../controller/userController');
var express = require('express');
var routes = express.Router();
var verify = require('../utility/jwtToken');

routes.post('/register', userController.createController);

routes.post('/login',userController.readController);

routes.post('/verify/:url',verify.verifyToken,userController.isVerifiedController);

routes.post('/forgetpassword',verify.forgotToken,userController.forgetPasswordController);

module.exports = routes;