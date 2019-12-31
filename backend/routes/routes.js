/**
 * @description This file specific the controller function for the routes
 * @file        routes.routes.js
 * @overview    According to the http methods the routes/express-router specific 
 *              the controller function or the next destination for the specified 
 *              route.
 * @author      Sindooja Gajam
 * @version     node v12.10.0 
 * @since       17 December 2019     
 */

/**
 * @const      routes Routes constant having the `express.Router` module
 */
var userController =  require('../controller/user');
var express = require('express');
const routes = express.Router();
var jwt = require('../utility/jwtToken');
var user = require('../app/model/user')

routes.post('/register', userController.createController);

routes.post('/login',userController.loginController);

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
            console.log("data from routes",data);
            response.redirect(data.longUrl);
        }
    })
})

routes.post('/verifyUser/:token',jwt.verifyToken,userController.isVerifiedController);  
module.exports = routes;