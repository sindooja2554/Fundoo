var labelModel =  require('../app/model/label');
// var userModel = require('../app/model/user');
var logger = require('../config/winston');
class Service
{
    createLabel(request)
    {
        logger.info("request in service " + request);
        console.log("request in service ", request);
        return new Promise(function (resolve, reject) {
            labelModel.create(request).then((data) => {
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

    async getAllLabels(request)
    {
        //    var data = await noteModel.read({"userId":request.userId});
        //    logger.info("data "+JSON.stringify(data))
        //    return data;
        logger.info("request in service " +JSON.stringify(request))
        return new Promise(function(resolve,reject){
            labelModel.read({"userId":request.userId})
            .then((data)=>{
                logger.info("response data in service " + JSON.stringify(data))
                logger.info("length "+data.length);
                if(data.length === 0)
                {
                    return reject("no label found");
                }
                else if(data !== null)
                {
                    return resolve(data);
                }
            })
            .catch(error=>{
                logger.info("error "+error)
                return reject(error);
            })
        })
    }

    deleteLabel(request)
    {
        logger.info("request in service " +JSON.stringify(request))
        return new Promise(function(resolve,reject){
            labelModel.delete({"_id":request.labelId})
            .then((data)=>{               
                if(data !== null)
                {
                    logger.info("response data in service "+data)
                    return resolve(data);
                }
                else 
                {
                    logger.info("In service "+data)
                    return reject("no label found");
                }
            })
            .catch(error=>{
                return reject(error);
            })
        })
    }

    editLabel(idObject,editObject)
    {
        logger.info("id obj "+JSON.stringify(idObject))
        logger.info("edit obj "+JSON.stringify(editObject));
        console.log("edit obj ",JSON.stringify(editObject))
        // logger.info("request length "+Object.keys(request).length);
        // if(request.description === undefined)
        // {
        //     var editObject = {
        //         "noteId" : request.noteId,
        //         "userId" : request.userId,
        //         "title" : request.title,
        //     }
        // }
        // logger.info("requestin services "+JSON.stringify(editObject));
        // logger.info("description "+editObject.description);
        return new Promise((resolve,reject)=>{
            noteModel.update({"_id":idObject.noteId},editObject)
            .then((data)=>{
                if(data !== null)
                {
                    logger.info("data in service "+data);
                    return resolve(data);
                }
                else{
                    logger.info("error in service "+data);
                    return reject(data);
                }
            })
            .catch(error=>{
                logger.info("error in service "+error);
                return reject(error)
            })
        })

    }
}

module.exports = new Service();