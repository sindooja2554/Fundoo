const bcrypt   = require('bcrypt');
module.exports = {
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