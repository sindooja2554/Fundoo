var userServices = require('../services/user');
var jsonWebToken = require('../utility/jwtToken');
var mailSender   = require('../utility/nodeMailer');
var urlShortner  = require('../utility/urlShortner');
var logger       = require('../config/winston');
class Controller
{
    urlShortnerController(request,shortenerObject,callback)
    {
        var res = {};
        userServices.urlShorteningServices(request,shortenerObject,(error,data)=>{
            if(error)
            {
                res.error = error;
                // return response.status(500).send(res);
                return callback(error);
            }
            else if(data === null)
            {
                res.success = false
                // return response.status(500).send(res);
                return callback(null,res)
            }
            else{
                res.success = true;
                res.data    = data;
                // return response.status(200).send(res);
                return callback(null,res)
            }
        })
    }

    // createController(request , response)
    // {
    //     request.check('firstName','First name must be 3 character long').isLength({min:3})
    //     request.check('firstName','First Name must be character string only').isAlpha()
    //     request.check('lastName','Last name must be 3 character long').isLength({min:3})
    //     request.check('lastName','Last Name must be character string only').isAlpha()
    //     request.check('email','Email must be in email format').isEmail();
    //     request.check('password','Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    //     var errors = request.validationErrors();
    //     var result = {};
    //     // console.log(errors);
    //     if(errors)
    //     {
    //         for(let i=0;i<errors.length;i++)
    //         {
    //             result.error = errors[i].msg;
    //         }
    //         result.success = false;
    //         return response.status(500).send(result);
    //     }
    //     else
    //     {
    //         logger.info("this from logger",request.body);
    //         let userData = {
    //             'firstName': request.body.firstName,
    //             'lastName': request.body.lastName,
    //             'email': request.body.email,
    //             'password': request.body.password
    //         }
    //         console.log("in controller");
    //         userServices.createService(userData , (error , data)=>{
    //             if(error)
    //             {
    //                 result.error   = error;
    //                 result.message = "Some error occurred";
    //                 result.success = false;
    //                 return response.status(500).send(result);
    //             }
    //             else if(data.success !== false)
    //             {   
    //                 console.log("data in res from ser",data);
    //                 console.log("data in response---",data);
    //                 let payload = {
    //                     '_id' : data._id
    //                 }
                    
    //                 let jwtToken = jsonWebToken.generateToken(payload);
    //                 let longURL = 'http://localhost:3001/verify/' + jwtToken;
                    
    //                 urlShortner.shortURL(data,longURL,(error,data)=>{
    //                     if(error)
    //                     {
    //                         result.error = error;
    //                         return response.status(501).send(result);
    //                     }
    //                     else
    //                     {  
    //                         console.log("sh--->",data);                                                     
    //                     }
    //                 })

    //                 // mailSender.sendMail(data.email,url)

    //                 result.message = "Successfully registered";
    //                 result.success = true;
    //                 result.data    = data;                   
    //                 return response.status(200).send(result);
    //             }
    //             else
    //             {
    //                 console.log("data---------->",data)
    //                 result.message = data.message;
    //                 result.success = data.success;
    //                 result.data    = data.data;
    //                 return response.status(500).send(result);
    //             }
    //         })
    //     }
    // }

    createController(request , response)
    {
        
        request.check('firstName','First name must be 3 character long').isLength({min:3})
        request.check('firstName','First Name must be character string only').isAlpha()
        // request.check('lastName','Last name cannot be empty').isEmpty()
        request.check('lastName','Last name must be 3 character long').isLength({min:3})
        request.check('lastName','Last Name must be character string only').isAlpha()
        request.check('email','Email must be in email format').isEmail();
        request.check('password','Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        var errors = request.validationErrors();
        var result = {};
        // console.log(errors);
        if(errors)
        {

            result.error = errors;           
            result.success = false;
            return response.status(400).send(result);
        }
        else
        {
            logger.info("this from logger",request.body);
            let userData = {
                'firstName': request.body.firstName,
                'lastName': request.body.lastName,
                'email': request.body.email,
                'password': request.body.password
            }
            console.log("in controller");
            return new Promise(function(resolve,reject){
                userServices.createService(userData).then((data)=>{
                    // if(error)
                    // {
                    //     result.error   = error;
                    //     result.message = "Some error occurred";
                    //     result.success = false;
                    //     return response.status(500).send(result);
                    // }
                    if(data.success !== false)
                    {   
                        console.log("data in res from ser",data);
                        console.log("data in response---",data);
                        let payload = {
                            '_id' : data._id
                        }
                        
                        let jwtToken = jsonWebToken.generateToken(payload);
                        let longURL = 'http://localhost:3001/verify/' + jwtToken;
                        
                        urlShortner.shortURL(data,longURL,(error,data)=>{
                            if(error)
                            {
                                result.error = error;
                                return response.status(501).send(result);
                            }
                            else
                            {  
                                console.log("sh--->",data);                                                     
                            }
                        })
    
                        // mailSender.sendMail(data.email,url)
    
                        result.message = "Successfully registered";
                        result.success = true;
                        result.data    = data;                   
                        return response.status(200).send(result);
                    }
                    else
                    {
                        console.log("data---------->",data)
                        result.message = data.message;
                        result.success = data.success;
                        result.data    = data.data;
                        return response.status(500).send(result);
                    }
                }).catch((error)=>{
                    result.error   = error;
                    result.message = "Some error occurred";
                    result.success = false;
                    return response.status(500).send(result);
                    // return response.status(500).send(error)
                })
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
            return response.status(400).send(result);
        }
        else
        {
            let readData = {
                'email': request.body.email,
                'password': request.body.password
            }

            userServices.readService(readData,(error,data)=>{
                console.log("ctrl==>",data);
                if(error)
                {
                    result.error = error;
                    result.success = false;
                    return response.status(500).send(result);
                }
                else if(data.success !== false)
                {
                    console.log(data)
                    let payload = {
                        '_id': data.data._id
                    }

                    let jwtToken = jsonWebToken.generateToken(payload)

                    result.token = jwtToken;
                    result.message = 'Login successful';
                    result.success = data.success;
                    result.data = data;
                    return response.status(200).send(result);
                }
                else
                {
                    result.message = data.message;
                    result.success = data.success;
                    result.data    = data.data;
                    return response.status(500).send(result);
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

    forgetPasswordController(request, response) {
        request.check('email', 'Email must be in email format').isEmail();
        var errors = request.validationErrors();
        var result = {};

        if (errors) {
            result.error = errors[0].msg;
            result.success = false;
            return response.status(400).send(result);
        }
        else {
            console.log("forgot")
            var result = {};
            let forgotPassword = {
                "email": request.body.email
            }
            userServices.forgetPassword(forgotPassword, (error, data) => {
                if (error) {
                    result.error = error;
                    result.succes = false;
                    return response.status(500).send(result);
                }
                else {
                    let payload = {
                        '_id': data._id
                    }
                    console.log("dtttt===", data);
                    let jwtToken = jsonWebToken.generateToken(payload)
                    let url = 'http://localhost:3001/resetpassword/' + jwtToken;
                    mailSender.sendMail(data.email, url);
                    // urlShortner.shortURL(data,longURL,(error,data)=>{
                    //     if(error)
                    //     {
                    //         result.error = error;
                    //         return response.status(500).send(result);
                    //     }
                    //     else
                    //     {  
                    //         console.log("sh--->",data);                                                     
                    //     }
                    // })

                    result.message = "Mailsent";
                    result.success = true;
                    return response.status(200).send(result);
                }
            })
        }
    }

    resetPasswordController(request, response) {
        request.check('password', 'Password must include one lowercase character, one uppercase character, a number, a special character and atleast 8 character long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        var errors = request.validationErrors();
        var result = {};

        if (errors) {
            result.error = errors[0].msg;
            result.success = false;
            return response.status(400).send(result);
        }
        else {
            // console.log("aaaaaaaaaaaaaaaaaaaaa==>",request)
            var result = {};
            let resetPassword = {
                "password": request.body.password,
                "id": request.body.data._id
            }
            userServices.resetPassswordService(resetPassword, (error, data) => {
                if (error) {
                    console.log("errrrrr", error)
                    result.error = error;
                    result.message = error;
                    result.success = false;

                    return response.status(500).send(result);
                }
                else {
                    console.log("aaa", data)
                    result.data = data;
                    result.success = true;

                    return response.status(200).send(result);
                }
            })
        }
    }
    // async findAllController(request, response) 
    // {
    //     var result = {};
    //     var data = await userServices.findAllService(request)

    //     if (data) {
    //         result.data = data;
    //         result.success = true;
    //         return response.status(200).send(result)
    //     }
    //     else {
    //         result.error = error;
    //         result.success = false;
    //         return response.status(500).send(result)
    //     } 
    // }
   
}

module.exports = new Controller();