var noteModel =  require('../app/model/note');
// var userModel = require('../app/model/user');
var logger = require('../config/winston');
class Service
{
    createNote(request)
    {
        logger.info("request in service " + request);
        console.log("request in service ", request);
        return new Promise(function (resolve, reject) {
            noteModel.create(request).then((data) => {
                if (data !== null) {
                    return resolve(data);
                }
                else {
                    return reject(data);
                }
            })
                .catch((error) => {
                    logger.info("data from serv " + error)
                    console.log("data from serv ", error)
                    return reject(error);
                })
        })
            .catch((error) => {
                logger.info("data from service " + error)
                console.log("data from service ", error)
                return reject(error);
            })
    }

    async getAllNotes(request,response)
    {
    
       var data = await noteModel.read({"userId":request.userId});
       console.log("data",data);
       return data;
    }
}

module.exports = new Service();