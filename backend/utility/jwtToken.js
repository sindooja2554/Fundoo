const jwt = require('jsonwebtoken');
var model = require('../app/model/model');
var controller = require('../controller/userController');

module.exports={
    generateToken(payload)
    {
        console.log("payload",payload);
        var token = jwt.sign(payload,'private_key')
        console.log("token",token);
        return token;
    },

    verifyToken(req,res,next)
    {
        console.log(req.params.url);
        model.findOne({"urlCode":req.params.url},(error,data)=>{
            if(error)
            {
                console.log(error)
                return error
            }else if(data == null){
                console.log("data null")
                return error
            }
            else{
                console.log("vdhsd",data);
                let longUrl = data.longUrl;
                console.log(longUrl);
                var token = longUrl.split("http://localhost:3001/verify/");
                token = token[1];
                console.log("abc==>",token);
                
                jwt.verify(token,'private_key',function (err,decoded){
                    console.log(" token in ",token);
                    
                    // console.log("tkg",data);
                    if(err)
                    {
                        return res.status(400).send(err+"Token has expired")
                    }
                    else{
                        console.log("token",JSON.stringify(decoded));
                        // console.log("\nJWT verification result: " + JSON.stringify(data));
                        req.body['data'] = decoded;
                   console.log(req.body);
                   req.token = decoded;
                   console.log(req.token);
                   next();
                    }
                })
            }
        })
    },

    forgotToken(req,res,next)
    {
                
        let token = req.headers['token']
        console.log(" token after vread",token);
        
        if(token)
        {
            jwt.verify(token,'private_key',function (err,decoded){
                console.log(" token in ",token);
                
                // console.log("tkg",data);
                if(err)
                {
                    return res.status(400).send(err+"Token has expired")
                }
                else{
                    console.log("token",JSON.stringify(decoded));
                    // console.log("\nJWT verification result: " + JSON.stringify(data));
                    req.body['data'] = decoded;
               console.log(req.body);
               req.token = decoded;
               next();
                }
            })
            // return req.decoded;
        }
        else{
            res.status(400).send('Token not received')
        }
    }
}