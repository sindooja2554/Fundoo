var userServices = require('../services/userServices');
var jsonWebToken = require('../utility/jwtToken');
var mailSender   = require('../utility/nodeMailer');
class Controller
{
    createController(request , response)
    {
        request.check('firstName','First name must be 3 character long').isLength({min:3})
        request.check('firstName','First Name must be character string only').isAlpha()
        request.check('lastName','Last name must be 3 character long').isLength({min:3})
        request.check('lastName','Last Name must be character string only').isAlpha()
        request.check('email','Email must be in email format').isEmail();
        request.check('password','Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        var errors = request.validationErrors();
        var result = {};
        console.log(errors);
        if(errors)
        {
            for(let i=0;i<errors.length;i++)
            {
                result.error = errors[i].msg;
            }
            result.success = false;
            return response.status(500).send(result);
        }
        else
        {
            let userData = {
                'firstName': request.body.firstName,
                'lastName': request.body.lastName,
                'email': request.body.email,
                'password': request.body.password
            }
            console.log("in controller");
            userServices.createService(userData , (error , data)=>{
                if(error)
                {
                    result.error   = error;
                    result.message = "Some error occurred";
                    result.success = false;
                    return response.status(500).send(result);
                }
                else
                {
                    console.log("data in response---",data);
                    let payload = {
                        '_id' : data._id
                    }
                    
                    let jwtToken = jsonWebToken.generateToken(payload);
                    let url = 'http://localhost:3000/verify/' + jwtToken;
                    mailSender.sendMail(data.email,url)

                    result.message = "Successfully registered";
                    result.success = true;
                    result.data    = data;                   
                    return response.status(200).send(result);
                }
            })
        }
    }

    readController(request,response)
    {
        request.check('email','Email must be in email format').isEmail();
        request.check('password','Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        
        var errors = request.validationErrors();
        var result ={};

        if(errors)
        {
            result.error = errors[0].msg;
            result.success = false;
            return response.status(500).send(result);
        }
        else
        {
            let readData = {
                'email': request.body.email,
                'password': request.body.password
            }

            userServices.readService(readData,(error,data)=>{
                if(error)
                {
                    result.error = error;
                    result.success = false;
                    return response.status(500).send(result);
                }
                else {
                    console.log(data)
                    let payload = {
                        '_id': data.id
                    }

                    let jwtToken = jsonWebToken.generateToken(payload)

                    result.token = jwtToken;
                    result.message = 'Login successful';
                    result.success = true;
                    result.data = data;
                    return response.status(200).send(result);
                }
            })
        }
    }

    isVerifiedController(request,response)
    {
        console.log("verifyC");
        userServices.isVerifiedService(request,(error,data)=>{
            var result={};
            if(error)
            {
                result.error = error;
                result.success = false;
                return response.status(500).send(result);
            }
            else
            {
                result.data = data;
                result.success = true;
                result.verified = true;
                return response.status(200).send(result);
            }
        })
    }
}

module.exports = new Controller();