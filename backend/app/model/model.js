const mongoose = require('mongoose');

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
    }

},
    {
        timestamps: true
});

var User = mongoose.model('User', UserSchema);


class Api
{
    findOne(request,callback)
    {
        console.log("sdbhsbin find one");
        User.findOne(request,(error,data)=>{
            console.log(request);
            if(error)
            {
                console.log(error)
                return callback('Error while finding user');
            }
            else if(data === null)
            {
                console.log(data);
                return callback(null,data);
            }
            else
            {
                console.log("***>",data);
                return callback(null,data);
            }
        })
    }

    updateOne(request,dataToUpdate,callback)
    {
        console.log("in updateone");
        User.findOneAndUpdate(request,dataToUpdate,(error,data)=>{
            if(error)
            {
                console.log(error);
                return callback('error while updating');
            }
            else
            {
                console.log(data);
                return callback(null,data);
            }
        })
    }

    create(request,callback)
    {
        console.log("in model");
        // User.findOne({ "email": request.email },(error,data)=>
        // {
        //     if(error)
        //     {
        //         return callback(error)
        //     }
        //     else if (data == null) {
                // encryptPassword(request.password, (error, data) => {
                //     console.log(request);
                //     if (error) {
                //         return callback('Error while encrypting password');
                //     }
                //     else {
                //         var encryptedPassword = data;
                        let createUser = new User({
                            "firstName": request.firstName,
                            "lastName": request.lastName,
                            "email": request.email,
                            "password": request.password,
                        })

                        createUser.save((error, data) => {
                            if (error) {
                                return callback('Error occurred while saving the data');
                            }
                            else {
                                return callback(null, data)
                            }
                        })
                //     }
                // })
            // }
        //     else
        //     {
        //         return callback('User already registered');
        //     }
        // })
    }

    // read(request,callback)
    // {
    //     console.log("happ",request);
    //     console.log("datacbdsjbndsjk---",data);
    //     // User.findOne({"email":request.email},(error,data)=>{
    //     //     if(error)
    //     //     {
    //     //         return callback('Error while finding');
    //     //     }
    //     //     else if(data == null){
    //     //         return callback('Email did not match');
    //     //     }
    //     //     else
    //     //     {
    //     //         console.log("dtaa",data)
    //     //         if(data.isVerified === true)
    //     //         {
    //                 bcrypt.compare(request.password,data.password,
    //                     (error,response)=>{
    //                         if(error)
    //                         {
    //                             console.log(error);
    //                             return callback('Error while comparing password');
    //                         }
    //                         else if(response == false)
    //                         {
    //                             console.log("error in res");
    //                             return callback('Password did not match')
    //                         }
    //                         else
    //                         {
    //                             console.log("====>",data)
    //                             return callback(null,data);
    //                         }
    //                 })
    //             // }
    //     //         else
    //     //         {
    //     //             return callback("Please check mail, visit url to verify");
    //     //         }
    //     //     }
    //     // })
    // }

    // isVerified(request, callback)
    // {
    //     console.log("verifyM",request.body.data._id);
    //     User.findOneAndUpdate({"_id":request.body.data._id},{"isVerified": true},(error,success)=>{
    //         if(error)
    //         {
    //             return callback('error');
    //         }
    //         else
    //         {
    //             console.log(success)
    //             return callback(null,success);
    //         }
    //     })
    // }

    // authenticate(request,callback)
    // {
    //     longUrl = request.longUrl;
    //     token   = 
    // }
}

module.exports = new Api();