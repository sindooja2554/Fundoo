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
var upload = require('../services/s3');
var singleUpload = upload.single('image');
var logger = require('../config/winston');

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

routes.post('/verifyuser/:token',jwt.verifyToken,userController.isVerifiedController);  

routes.post('/imageupload',jwt.verifyToken, function(request,response){
    console.log("req",request.body);
    var imageSaveObject = {};
    imageSaveObject.id = request.body.data._id;
    
    singleUpload(request,response,function(error){
        var res={};
        if(error)
        {
            console.log("err",error);
            // logger.info("err",error);
            res.message = error;
            res.success = false;
            return response.status(500).send(res);
        }else{
            console.log("data",request.body);
            // logger.info("data",request.body);
            console.log("file",request.file.location)
            // logger.info("file",request.file.location);
            
            imageSaveObject.imageUrl = request.file.location;
            console.log(imageSaveObject);
            // logger.info(imageSaveObject);
            userController.uploadImageController(imageSaveObject,response)
            {
                if(error)
                {
                    res.error = error;
                    res.success = false;
                    return response.status(500).send(res);
                }
                else
                {
                    res.message = "Successfully saved";
                    res.success = true;
                    return response.status(200).send(res);
                }
            }
        }
    })
}); 

module.exports = routes;