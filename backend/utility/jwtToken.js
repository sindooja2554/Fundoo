const jwt = require('jsonwebtoken');

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