/**
 * @description This file contains function to encrypt and comapre password.
 * @file        utility.bcrypt.js
 * @since       18 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @const       bcrypt Bcrypt constant having the `bcrypt` module
 */

const bcrypt   = require('bcrypt');

module.exports = {
    /**
     * @description This function is called to encrypt the password. 
     * @function    encryptPassword
     * @param {*}   request 
     * @param {*}   callback 
     */
    encryptPassword(request, callback) {
        console.log("--->",request);
        bcrypt.hash(request, 10, (err, data) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            else {
                console.log("hash ", data);
                return callback(null, data);
            }
        })
    },

    /**
     * @description This function encrypt the password and compare the password which is
     *              is already present in database.
     * @function    comparePassword
     * @param {*}   request 
     * @param {*}   data 
     * @param {*}   callback 
     */
    comparePassword(request,data,callback){
        bcrypt.compare(request,data,(error,data)=>{
            if(error)
            {
                return callback(error);
            }
            else
            {
                var result = {};
                result.success = false;
                console.log("from utility",data)
                return callback(null,data);
            }
        })
    }
}