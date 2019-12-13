var userModel = require('../app/model/model');
class Services
{
    createService(request , callback)
    {
        console.log(request);
        console.log("in services");
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

    readService(request,callback)
    {
        userModel.read(request,(error,data)=>{
            if(error)
            {
                return callback(error);
            }
            else{
                return callback(null,data)
            }
        })
    }

    isVerifiedService(request,callback)
    {
        console.log("verifyS");
        userModel.isVerified(request,(error,data)=>{
            if(error)
            {
                return callback(error);
            }
            else
            {
                return callback(null,data)
            }
        })
    }
}

module.exports = new Services();