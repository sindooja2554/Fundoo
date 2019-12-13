const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
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
    }
},
    {
        timestamps: true
});

var User = mongoose.model('User', UserSchema);

function encryptPassword(password , callback){
    bcrypt.hash(password, 10, (err, data) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        else {
            console.log("hash ",data);
            callback(null, data);
        }

    })
}
class Api
{
    create(request,callback)
    {
        console.log("in model");
        User.findOne({ "email": request.email },(error,data)=>
        {
            if(error)
            {
                return callback(error)
            }
            else if (data == null) {
                encryptPassword(request.password, (error, data) => {
                    if (error) {
                        return callback('Error while encrypting password');
                    }
                    else {
                        var encryptedPassword = data;
                        let createUser = new User({
                            "firstName": request.firstName,
                            "lastName": request.lastName,
                            "email": request.email,
                            "password": encryptedPassword,
                        })

                        createUser.save((error, data) => {
                            if (error) {
                                return callback('Error occurred while saving the data');
                            }
                            else {
                                return callback(null, data)
                            }
                        })
                    }
                })
            }
            else
            {
                return callback('User already registered');
            }
        })
    }

    read(request,callback)
    {
        console.log("happ",request);
        User.findOne({"email":request.email},(error,data)=>{
            if(error)
            {
                return callback('Error while finding');
            }
            else if(data == null){
                return callback('Email did not match');
            }
            else
            {
                console.log("dtaa",data)
                if(data.isVerified === true)
                {
                    bcrypt.compare(request.password,data.password,
                        (error,response)=>{
                            if(error)
                            {
                                return callback('Error while comparing password');
                            }
                            else if(response == false)
                            {
                                return callback('Password did not match')
                            }
                            else
                            {
                                return callback(null,data);
                            }
                    })
                }
                else
                {
                    return callback("Please check mail, visit url to verify");
                }
            }
        })
    }

    isVerified(request, callback)
    {
        console.log("verifyM",request.body.data._id);
        User.findOneAndUpdate({"_id":request.body.data._id},{"isVerified": true},(error,success)=>{
            if(error)
            {
                return callback('error');
            }
            else
            {
                console.log(success)
                return callback(null,success);
            }
        })
    }
}

module.exports = new Api();