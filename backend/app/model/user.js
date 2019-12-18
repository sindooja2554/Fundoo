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

    create(request) 
    {
        console.log("in model");

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

    findAll(request)
    {

        var data = User.find({});
        console.log('ttt');
        
        return data;
      
    }
}

module.exports = new Api();