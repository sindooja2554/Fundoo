/**
 * @description This file contains API class.
 * @file        app.model.user.js
 * @overview    The API function take in request and perform the operation and sends back
 *              response to the service file
 * @author      Sindooja Gajam
 * @version     node v12.10.0 
 * @since       16 December 2019            
 */

/**
 * @const       mongoose Mongoose constant having the `mongoose` module
 */

const mongoose = require('mongoose');
var logger       = require('../../config/winston');
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    longUrl:{
        type: String,
        default: null
    },
    shortUrl:{
        type: String,
        default: null
    },
    urlCode:{
        type: String,
        default: null
    },
    imageUrl:{
        type: String,
        default:''
    }

},
    {
        timestamps: true
});

var User = mongoose.model('User', UserSchema);

class Api
{
    /**
     * @description This function takes in request and using mongoose query sends back
     *              the response.
     * @function    findOne
     * @param {*}   request 
     * @param {*}   callback 
     */
    findOne(request,callback)
    {
        // console.log("sdbhsbin find one");
        User.findOne(request,(error,data)=>{
            // console.log(request);
            if(error)
            {
                // console.log(error)
                return callback('Error while finding user');
            }
            else if(data === null)
            {
                logger.info("model find one",data);
                return callback(error,null);
            }
            else
            {
                // console.log("***>",data);
                return callback(null,data);
            }
        })
    }

    /**
     * @description This function takes in request and using mongoose query update the
     *              fields in the database
     * @param {*}   request 
     * @param {*}   dataToUpdate 
     * @param {*}   callback 
     */
    updateOne(request,dataToUpdate)
    {
        // console.log("in updateone",request);
        return new Promise(function(resolve,reject){
            User.findOneAndUpdate(request,dataToUpdate,{"new":true}).then(data=>{
                // console.log("in updateone",data);
                resolve(data)
            })
            .catch(error=>{
                reject(error)
            })
        })
      
        //  ,(error,data)=>{
        //     if(error)
        //     {
        //         console.log("model",error);
        //         return callback(error);
        //     }
        //     else
        //     {
        //         console.log(data);
        //         return callback(null,data);
        //     }
        // })
    }

    /**
     * @description This function takes in request as a parameter and save the object 
     *              in the database.
     * @param {*} request 
     */
    create(request) 
    {
        // console.log("in model");

        let createUser = new User({
            "firstName": request.firstName,
            "lastName": request.lastName,
            "email": request.email,
            "password": request.password,
        })
        return new Promise(function (resolve, reject) {
            createUser.save().then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

}

module.exports = new Api();