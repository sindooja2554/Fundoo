var noteModel = require('../app/model/note');
var logger = require('../config/winston');

class Service {
    createNote(request) {
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

    async getAllNotes(request, response) {
        logger.info("request in service " + JSON.stringify(request))
        return new Promise(function (resolve, reject) {
            noteModel.read({ "userId": request.userId })
                .then((data) => {
                    logger.info("response data in service " + JSON.stringify(data))
                    if (data !== null) {
                        return resolve(data);
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
        return new Promise(function (resolve, reject) {
            noteModel.delete({ "_id": request.noteId, "userId": request.userId })
                .then((data) => {
                    if (data === null) {
                        logger.info("response data in service " + data)
                        return resolve(data);
                    }
                    // else if(data===null)
                    // {
                    //     return reject(data);
                    // }
                    else if (data !== null) {
                        return resolve(data);
                    }
                })
                .catch(error => {
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
                        "color": editObject.color ? editObject.color : data.color,
                        "isArchived": editObject.isArchived === true ? true : false,
                        "isPinned": editObject.isPinned === true ? true : false,
                        "isTrash": editObject.isTrash === true ? true : false
                    }

                    logger.info("data in service ",+JSON.stringify(note));

                    noteModel.update({ "_id": idObject.noteId }, note)
                        .then((data) => {
                            if (data !== null) {
                                logger.info("data in service " + data);
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
            .catch(error=>{
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
}

module.exports = new Service();