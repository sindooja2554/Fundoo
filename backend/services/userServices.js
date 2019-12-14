var userModel = require('../app/model/model');
var bcrypt    = require('../utility/bcrypt');
class Services
{
    createService(request , callback)
    {
        console.log("inservices");
        var res = {};
        userModel.findOne({ "email": request.email },(error,data)=>{
            if(error)
            {
                return callback(error);
            }
            else if(data == null)
            {
                bcrypt.encryptPassword(request.password,(error,encryptedPassword)=>{
                    if(error)
                    {
                        return callback(error)
                    }
                    else
                    {
                        request.password = encryptedPassword;
                        console.log("--------->",request);
                        userModel.create(request , (error,data)=>{
                            if(error)
                            {
                                return callback(error);
                            }
                            else
                            {
                                return callback(null,data);
                            }
                        })
                    }
                })

            }
            else
            {
                res.message = 'Already registered';
                res.success = false;
                res.data    = data;
                return callback(null,res);
            }
        })

    }

    readService(request,callback)
    {
        console.log("req in login",request);
        var res={};
        userModel.findOne({"email":request.email},(error,data)=>{
            if(error)
            {
                return callback(error);
            }
            else if(data === null)
            {
                res.message = 'Please register to login';
                res.success = false;
                res.data    = data;
                return callback(null,res);
            }
            else{
                if(data.isVerified === true)
                { 
                    console.log("calling utility###>",data);
                    console.log("req",request.password);               
                    bcrypt.comparePassword(request.password,data.password,(error,success)=>{
                        if(error)
                        {
                            return callback(error);
                        }
                        else if(success === false)
                        {
                            res.message = 'Password did not match';
                            res.success = false;
                            return callback(null,res);
                        }
                        else
                        {
                            console.log("abc SUCCESS=>",success)
                            res.success =true;
                            res.data    =data;
                            return callback(null,res);
                        }
                    })            
                }
                else
                {
                    res.message = 'Please verify your email to login';
                    res.success = false;
                    res.data    = data;
                    return callback(null,res);
                }
            }
        })
    }

    isVerifiedService(request,callback)
    {
        console.log("verifyS");
        userModel.updateOne({"_id":request.body.data._id},{"isVerified": true},(error,success)=>{
            if(error)
            {
                return callback(error);
            }
            else
            {
                return callback(null,success);
            }
        })
        // userModel.isVerified(request,(error,data)=>{
        //     if(error)
        //     {
        //         return callback(error);
        //     }
        //     else
        //     {
        //         return callback(null,data)
        //     }
        // })
    }

    urlShorteningServices(request,shortnerObject,callback)
    {
        console.log("request",request);
        console.log("short",shortnerObject);
        console.log("in url shortener");
        userModel.findOne({"email":request.email},(error,data)=>{
            if(error)
            {
                return callback(error)
            }
            else if(data == null)
            {
                return callback(error)
            }
            else
            {
                userModel.updateOne({"_id":request.id},{"longUrl":shortnerObject.longUrl,"shortUrl":shortnerObject.shortUrl,"urlCode":shortnerObject.urlCode},(error,data)=>{
                    if(error)
                    {
                        return callback(error);
                    }
                    else
                    {
                        return callback(null,data);
                    }
                })
            }
        })   
    }

    forgetPassword(request,callback)
    {
        userModel.findOne({"_id":request.id},(error,data)=>{
            if(error)
            {
                return callback(error)
            }
            else if(data==null){
                return callback(error)
            }
            else{
                return callback(null,data);
            }
        })
    }
}

module.exports = new Services();