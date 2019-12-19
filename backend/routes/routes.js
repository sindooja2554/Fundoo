var userController =  require('../controller/user');
var express = require('express');
var routes = express.Router();
var jwt = require('../utility/jwtToken');

routes.post('/register', userController.createController);

routes.post('/login',userController.readController);

routes.post('/verify/:url',jwt.verifyToken,userController.isVerifiedController);

routes.post('/forgotpassword',userController.forgetPasswordController);

routes.post('/resetpassword',jwt.forgotToken,userController.resetPasswordController);

// routes.get('/findAll',userController.findAllController);

module.exports = routes;