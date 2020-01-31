var labelModel = require('../app/model/label');
var noteService = require('../services/note');
var logger = require('../config/winston');
class Service {
    createLabel(request) {
        logger.info("request in service " + request);
        console.log("request in service ", request);
        var result = {};
        return new Promise(function (resolve, reject) {
            labelModel.read({ "label": request.label} , {"userId" : request.userId }).then(data => {
                logger.info("data after reading " + data.length)
                if (data.length === 0) {
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
                }
                else {
                    return reject('Label already exists')
                }
            })
                .catch((error) => {
                    logger.info("data from service " + error)
                    console.log("data from service ", error)
                    return reject(error);
                })
        })

    }

    async getAllLabels(request) {
        logger.info("request in service " + JSON.stringify(request))
        return new Promise(function (resolve, reject) {
            labelModel.read({ "userId": request.userId })
                .then((data) => {
                    logger.info("response data in service " + JSON.stringify(data))
                    logger.info("length " + data.length);
                    if (data.length === 0) {
                        return resolve(data);
                    }
                    else if (data !== null) {
                        return resolve(data);
                    }
                })
                .catch(error => {
                    logger.info("error " + error)
                    return reject(error);
                })
        })
    }

    deleteLabel(request) {
        logger.info("request in service " + JSON.stringify(request))
        return new Promise(function (resolve, reject) {
            // var noteIdObject = {};
            // labelModel.read({ "_id": request.labelId }).then((data) => {
            //     if (data !== null) {
                    // console.log(data[0].noteId);
                    // noteIdObject = {
                    //     noteId: data[0].noteId
                    // }
                    labelModel.delete({ "_id": request.labelId })
                        .then((data) => {
                            if (data !== null) {
                                logger.info("response in label service" + data)
                                noteService.deleteLabel({ "labels": request.labelId }, data).then(response => {
                                    if (response !== null) {
                                        logger.info("-----------------")
                                        return resolve(response);
                                    }
                                    else {
                                        return reject(response);
                                    }
                                })
                                .catch(error=>{
                                    logger.error("error "+error);
                                    return reject(error);
                                })
                            }
                            else {
                                logger.info("error in service " + data);
                                return resolve(data);
                            }
                        })
                        .catch(error => {
                            return reject(error);
                        })
                // }
            // })
            //     .catch(error => {
            //         logger.info("err=====>", error);
            //         return reject(error);
            //     })
        })
    }

    editLabel(editObject) {
        logger.info("edit obj " + JSON.stringify(editObject.labelId));
        var noteIdObject = {};
        return new Promise((resolve, reject) => {
            labelModel.read({ "_id": editObject.labelId }).then((data) => {
                if (data !== null) {
                    logger.info("data---------------------------------------> " + data);
                    noteIdObject = {
                        noteId: data[0].noteId
                    }
                    console.log(noteIdObject);
                    console.log("edit", editObject.noteId);
                    let label = {
                        "noteId": editObject.noteId ? editObject.noteId : data[0].noteId,
                        "label": editObject.label ? editObject.label : data[0].label
                    }
                    logger.info("data sendfing in note " + JSON.stringify(label));
                    labelModel.update({ "_id": editObject.labelId }, label)
                        .then((data) => {
                            if (data !== null) {
                                logger.info("data in label service " + JSON.stringify(noteIdObject));
                                noteService.updateNote({ "_id": noteIdObject.noteId }, data).then((response) => {
                                    if (response !== null) {
                                        logger.info("-----------------")
                                        return resolve(response);
                                    }
                                    else {
                                        return reject(response);
                                    }
                                })
                            }
                            else {
                                logger.info("error in service " + data);
                                return resolve(data);
                            }
                        })
                        .catch(error => {
                            return reject(error)
                        })
                }
            })
                .catch(error => {
                    return reject(error)
                })
        })
    }

}

module.exports = new Service();