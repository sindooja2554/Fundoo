var userController =  require('../controller/user');
var express = require('express');
var routes = express.Router();
var jwt = require('../utility/jwtToken');
var user = require('../app/model/user')

routes.post('/register', userController.createController);

routes.post('/login',userController.readController);

// routes.post('/verify/:url',jwt.verifyToken,userController.isVerifiedController);

routes.post('/forgotpassword',userController.forgetPasswordController);

routes.post('/resetpassword',jwt.verifyToken,userController.resetPasswordController);

// routes.get('/findAll',userController.findAllController);

routes.get('/verify/:url',(request,response)=>{
    console.log("routes",request.params.url);
    user.findOne({"urlCode":request.params.url},(error,data)=>{
        if(error)
        {
            return response.status(404).send('Url not found');
        }
        else 
        {
            console.log("data from routes",data.longUrl);
            response.redirect(data.longUrl);
        }
    })
})

routes.post('/verifyUser/:token',jwt.verifyToken,userController.isVerifiedController);  
module.exports = routes;