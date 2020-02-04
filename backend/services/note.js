var noteModel = require('../app/model/note');
var logger = require('../config/winston');
var labelModel = require('../app/model/label');
// var redis = require("redis"),
//     client = redis.createClient();
var redisCache = require("./redis");
class Service {
 
     
    // async
    getAllNotes(request) {
        logger.info("request in service " + JSON.stringify(request))
        return new Promise(function (resolve, reject) {
            noteModel.read({ "userId": request.userId })
                .then((data) => {
                    // logger.info("response data in service " + JSON.stringify(data))
                    if (data !== null) {
                        redisCache.set('getAllNotes'+request.userId,JSON.stringify(data),(reply)=>{
                            if(reply) {
                                return resolve(data);
                            }
                        })
                    }
                    else {
                        return resolve("no note found");
                    }
                })
                .catch(error => {
                    return reject(error);
                })
        })
    }

    deleteNote(request) {
        logger.info("request in service " + JSON.stringify(request))
        let get = this;
        return new Promise(function (resolve, reject) {
            noteModel.delete({ "_id": request.noteId, "userId": request.userId })
                .then((data) => {
                    if (data === null) {
                        // logger.info("response data in service " + data)
                        // let getNotesObject = {
                        //     'userId' : request.userId
                        // }
                        // this.getAllNotes(getNotesObject)
                        return resolve(data);
                    }
                    else if (data !== null) {
                        let getNotesObject = {
                            'userId' : request.userId
                        }
                        get.getAllNotes(getNotesObject)
                        return resolve(data);
                    }
                })
                .catch(error => {
                    return reject(error);
                })
        })
    }

    createNote(request) {
        let get = this;
        logger.info("request in service " + request);
        return new Promise(function (resolve, reject) {
            noteModel.create(request).then((data) => {
                if (data !== null) {
                    let getNotesObject = {
                        'userId' : request.userId
                    }
                    get.getAllNotes(getNotesObject);
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
    }

    editNote(idObject, editObject) {
    
        logger.info("id obj " + JSON.stringify(idObject))
        logger.info("edit obj " + JSON.stringify(editObject));
        console.log("edit obj ", JSON.stringify(editObject))
        return new Promise((resolve, reject) => {

            noteModel.read({ "_id": idObject.noteId }).then((data) => {
                if (data !== null) {
                    let note = {
                        "title": editObject.title ? editObject.title : data.title,
                        "description": editObject.description ? editObject.description : data.description,
                        "color": {
                            "name": editObject.color.name ? editObject.color.name : data.color.name,
                            "code": editObject.color.code ? editObject.color.code : data.color.code
                        },
                        // "remainder": editObject.remainder ? editObject.remainder : data.remainder,
                        "isArchive": editObject.isArchive === true ? true : false,
                        "isPinned": editObject.isPinned === true ? true : false,
                        "isTrash": editObject.isTrash === true ? true : false,
                        // "labels" : {
                        //      "_id" : editObject.noteId === editObject.noteId ? editObject.noteId : data.noteId,
                        //      "label": editObject.label === editObject.label ? editObject.label : data.label
                        // } 
                    }

                    logger.info("data in service ", +JSON.stringify(note));

                    noteModel.update({ "_id": idObject.noteId }, note)
                        .then((data) => {
                            if (data !== null) {
                                logger.info("data in service " + data);
                                let getNotesObject = {
                                    'userId' : idObject.userId
                                }
                                this.getAllNotes(getNotesObject)
                                return resolve(data);
                            }
                            else {
                                logger.info("error in service " + data);
                                return resolve(data);
                            }
                        })
                        .catch(error => {
                            logger.info("error in service " + error);
                            return reject(error)
                        })
                }
            })
                .catch(error => {
                    logger.info("error in service " + error);
                    return reject(error)
                })

        })
    }

    addRemainder(request) {
        logger.info("request in service file " + request);
        return new Promise((resolve, reject) => {
            noteModel.update({ "_id": request.noteId }, { "remainder": request.remainder })
                .then((data) => {
                    if (data !== null) {
                        logger.info("data in service " + data);
                        let getNotesObject = {
                            'userId' : request.userId
                        }
                        this.getAllNotes(getNotesObject)
                        return resolve(data);
                    }
                    else if (data == null) {
                        logger.info("error in service " + data);
                        return resolve(data);
                    }
                })
                .catch(error => {
                    logger.info("error in service " + error);
                    return reject(error)
                })
        })
    }

    removeReminder(request) {
        logger.info("request in service file " + request);
        return new Promise((resolve, reject) => {
            noteModel.update({ "_id": request.noteId }, { "remainder": request.remainder })
                .then((data) => {
                    if (data !== null) {
                        logger.info("data in service " + data);
                        let getNotesObject = {
                            'userId' : request.userId
                        }
                        this.getAllNotes(getNotesObject)
                        return resolve(data);
                    }
                    else if (data == null) {
                        logger.info("error in service " + data);
                        return resolve(data);
                    }
                })
                .catch(error => {
                    logger.info("error in service " + error);
                    return reject(error)
                })
        })
    }

    search(request) {
        logger.info("request in service========> " + JSON.stringify(request))
        return new Promise((resolve, reject) => {
            // {$or:[{"firstName":{$regex:".*ray.*"}},{"lastName":{$regex:".*ray.*"}}]}
            noteModel.read(
                {
                    $and: [
                        { $or: [{ "userId": request.userId }] },
                        {
                            $or: [
                                { "title": { $regex: request.value } },
                                { "description": { $regex: request.value } },
                                { "color.name": { $regex: request.value } },
                                { "remainder": { $regex: request.value } }
                            ]
                        }
                    ]
                })
                .then(data => {
                    if (data !== null) {
                        logger.info("data in service " + data);                      
                        return resolve(data);
                    }
                    else if (data == null) {
                        logger.info("error in service " + data);
                        return resolve(data);
                    }
                })
                .catch(error => {
                    logger.info("error in service " + error);
                    return reject(error)
                })
        })

    }

    addLabelToNote(request) {
        logger.info("request in note service===> " + JSON.stringify(request))
        return new Promise((resolve, reject) => {
            if(request.labelId === null) {
                logger.info("in if")
                labelModel.create(request).then(data => {
                    logger.info("data after successfully creating label " + data);
                    noteModel.update({ "_id": request.noteId }, { $push: { "labels": data._id } }).then((data) => {
                        let getNotesObject = {
                            'userId' : request.userId
                        }
                        this.getAllNotes(getNotesObject)
                        return resolve(data);
                    })
                    .catch(error => {
                        return reject(error);
                    })
                })
                .catch(error=>{
                    return reject(error);
                })
            }
            else {
                logger.info("in else")
                noteModel.update({"_id" : request.noteId}, { $push : { "labels" : request.labelId} }).then((data)=>{
                    let getNotesObject = {
                        'userId' : request.userId
                    }
                    this.getAllNotes(getNotesObject)
                    return resolve(data);
                })
                .catch(error => {
                    return reject(error);
                })
            } 
        })
    }

    deleteLabelFromNote(request,editObject) {
        // logger.info("id obj " + JSON.stringify(idObject))
        logger.info("edit obj " + JSON.stringify(editObject));
        return new Promise((resolve, reject) => {
            noteModel.read(request)
                .then((data) => {
                    logger.info(" "+JSON.stringify(data))
                    if (data[0].labels.length !== 0) {
                        logger.info(" service " + data[0]);
                        for (let i = 0; i < data[0].labels.length; i++) {

                            logger.info("in for loop " + editObject.labelId);

                            logger.info("   " + data[0].labels[i]._id);

                            if (JSON.stringify(data[0].labels[i]._id) === JSON.stringify(editObject.labelId)) {
                            // if (data[0].labels[i]._id === editObject.labelId)
                                data[0].labels.splice(i, 1);

                                logger.info("data after splice=======>" + data[0].labels);

                                noteModel.update({ "_id":  editObject.noteId }, { "labels": data[0].labels })
                                    .then((data) => {
                                        if (data !== null) {
                                            logger.info("data in service " + data);
                                            logger.info("userID " + editObject);
                                            let getNotesObject = {
                                                'userId' : editObject.userId
                                            }
                                            this.getAllNotes(getNotesObject)
                                            return resolve(data);
                                        }
                                        else {
                                            logger.info("error in service " + data);
                                            return reject(data);
                                        }
                                    })
                                    .catch(error => {
                                        logger.info("error in service " + error);
                                        return reject(error)
                                    })
                            }
                        }
                    }
                })
                .catch(error => {
                    logger.info("error in service " + error);
                    return reject(error)
                })
        })
    }

    deleteLabel(request, editObject) {
        logger.info("edit obj " + JSON.stringify(editObject));
        return new Promise((resolve, reject) => {
            noteModel.read(request)
                .then((data) => {
                    logger.info("data after reading" + JSON.stringify(data[0].labels))
                    var labelsId = [];
                    for (let i = 0; i < data[0].labels.length; i++) {
                        labelsId[i] = data[0].labels[i]._id
                    }
                    noteModel.update({ "_id": data[0]._id }, { "labels": labelsId })
                        .then((data) => {
                            if (data !== null) {
                                logger.info("data in service " + data);
                                let getNotesObject = {
                                    'userId' : request.userId
                                }
                                this.getAllNotes(getNotesObject)
                                return resolve(data);
                            }
                            else {
                                logger.info("error in service " + data);
                                return reject(data);
                            }
                        })
                        .catch(error => {
                            logger.info("error in service " + error);
                            return reject(error)
                        })
                })
                .catch(error => {
                    logger.info("error in service " + error);
                    return reject(error)
                })
        })
    }    
}

module.exports = new Service();