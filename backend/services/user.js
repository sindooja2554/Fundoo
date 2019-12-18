var userModel = require('../app/model/user');
var bcrypt    = require('../utility/bcrypt');
class Services
{
    createService(request)
    {
        console.log("inservices");
        var res = {};
        return new Promise(function(resolve,reject)
        {
            userModel.findOne({ "email": request.email },(error,data)=>{
                if(error)
                {
                    reject(error);
                }
                else if(data == null)
                {
                    bcrypt.encryptPassword(request.password,(error,encryptedPassword)=>{
                        if(error)
                        {
                            reject(error)
                        }
                        else
                        {
                            request.password = encryptedPassword;
                            console.log("--------->",request);
                            userModel.create(request)
                            .then((data)=>{
                                // if(error)
                                // {
                                //     reject(error);
                                // }
                                // else
                                // {
                                    resolve(data);
                                
                            })
                            .catch(err=>{
                                reject(err);
                            })
                        }
                    })
    
                }
                else
                {
                    res.message = 'Already registered';
                    res.success = false;
                    res.data    = data;
                    resolve(res);
                }
            })
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
        console.log("pass")
        userModel.findOne({"email":request.email},(error,data)=>{
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

    resetPassswordService(request,callback)
    {
        userModel.findOne({"_id":request.id},(error,data)=>{
            if(error)
            {
                return callback(error)
            }
            else if(data === null){
                return callback(error);
            }
            else
            {
                console.log("::::::>",data);
                bcrypt.encryptPassword(request.password,(error,encryptedData)=>{
                    if(error)
                    {
                        return callback(error)
                    }
                    else
                    {
                        console.log("(((((>",encryptedData)
                        let encryptPassword = encryptedData;
                        userModel.updateOne({"_id":data.id},{"password":encryptPassword},(error,data)=>{
                            if(error)
                            {
                                return callback(error)
                            }
                            else
                            {
                                return callback(data);
                            }
                        })
                    }
        
                })
        
            }
        })
    }

    async getAllUsers(request)
    {
        var data = await userModel.findAll({}) 
        console.log(data);
        return data;      
    }
}

module.exports = new Services();