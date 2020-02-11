/**
 * @description API controller Class
 * @file        controller.note.js
 * @overview    API controller class controls all the API's, gives call to
 *              service functions of the API's
 * @author      Sindooja Gajam
 * @version     node v12.10.0
 * @since       16 January 2020
 */
var noteService = require('../services/note');
var logger      = require('../config/winston');
var redisCache  = require('../services/redis');

class Controller {

    /**
     * @description This function is called to create note by calling the service function
     * @function    createNote
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    createNote(request, response) {
        logger.info("request in ctrl " + request.body);
        try {
            if (request.body.title === null || request.body.description === null
            ) throw 'Request body cannot be null';
            if (request.body.title === undefined || request.body.description === undefined
            ) throw 'Request body cannot be undefined';

            request.check('title', 'title must be atleast 3 character long')
                .isLength({ min: 3 })
            request.check('title', 'title cannot be empty')
                .notEmpty()
            request.check('description', 'description must be atleast 3 character long')
                .isLength({ min: 3 })
            request.check('description', 'description cannot be empty')
                .notEmpty()
            var result = {};
            var errors = request.validationErrors();
            if (errors) {

                result.error = errors;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                if ("title" in request.body && "description" in request.body 
                && "color" in request.body &&
                    "isArchive" in request.body && "isPinned" in request.body && "isTrash" in request.body &&
                    "name" in request.body.color && "code" in request.body.color && "remainder" in request.body) 
                {
                        logger.info("req")
                    let createNoteObject = {
                        'title': request.body.title,
                        'description': request.body.description,
                        'userId': request.body.data._id,
                        'color': {
                            'name': request.body.color.name,
                            'code': request.body.color.code
                        },
                        'remainder': request.body.remainder,
                        'isArchive': request.body.isArchive,
                        'isPinned': request.body.isPinned,
                        'isTrash': request.body.isTrash,
                        // 'labels': request.body.labels || null,
                        'userId' : request.body.data._id
                    }
                    logger.info("userId " + createNoteObject)
                    noteService.createNote(createNoteObject).then((data) => {
                        if (data !== null) {
                            result.data = data;
                            result.success = true;
                            result.message = 'Note Successfully Created'
                            return response.status(200).send(result);
                        }
                        else {
                            result.error = error;
                            result.success = false;
                            result.message = 'Note Was not Created'
                            return response.status(400).send(result);
                        }

                    })
                        .catch((error) => {
                            result.error = error;
                            result.success = false;
                            result.message = 'Error'
                            return response.status(500).send(result);
                        })
                }
                else {
                    result.success = false;
                    result.message = "Please add all fields in request body";
                    result.error   = "Please add all fields in request body";
                    return response.status(400).send(result)
                }
            }
        }
        catch (error) {
            var result = {};
            result.error = error;
            result.success = false;
            result.message = "Bad happened"
            return response.status(400).send(result)
        }
    }

    /**
     * @description This function is called to get all notes by getting notes from redis cache
     * @function    getAllNotes
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    getAllNotes(request, response) {
        var result = {};
        redisCache.get('getAllNotes'+request.body.data._id , (reply) => {
            console.log("in")
            if (reply) {
                logger.info("data from redis==> "+ reply);
                result.success = true;
                result.message = "Notes found";
                result.data = JSON.parse(reply);
                return response.status(200).send(result);
            }
        })
    }

    /**
     * @description This function is called to delete note by calling service function
     * @function    deleteNote
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    deleteNote(request, response) {
        try {
            if (request.params.noteId === undefined || request.params.noteId === null)
                throw "NoteId cannot be undefined or null"
            request.check('noteId', 'Must be in the mongoose unique Id format')
                .matches(/^[0-9a-fA-F]{24}$/)

            var errors = request.validationErrors();
            var result = {};
            logger.info("errors " + JSON.stringify(errors))
            if (errors) {
                logger.info("errors " + JSON.stringify(errors[0].msg))
                result.error = errors[0].msg;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                var result = {};
                logger.info("noteId " + request.params.noteId);
                logger.info("request.body.data._id " + JSON.stringify(request.body.data._id));
                let deleteNoteObject = {
                    'userId': request.body.data._id,
                    'noteId': request.params.noteId
                }
                logger.info("delete object " + JSON.stringify(deleteNoteObject));
                noteService.deleteNote(deleteNoteObject)
                    .then((data) => {
                        if (data === null) {
                            result.success = true;
                            result.message = "No note present to be deleted";
                            result.data = data;
                            return response.status(404).send(result);
                        }
                        else if (data !== null) {
                            logger.info("response " + JSON.stringify(data));
                            result.success = true;
                            result.message = "Deleted Successfully";
                            result.data = data;
                            return response.status(200).send(result)
                        }
                    })
                    .catch(error => {
                        logger.info("error " + error)
                        result.success = false;
                        result.message = "Error Occured";
                        result.error = error;
                        return response.status(500).send(result)
                    })
            }
        }
        catch (error) {
            result.error = error;
            result.success = false;
            return response.status(400).send(result)
        }
    }

    /**
     * @description This function is called to edit note by calling service function
     * @function    deleteNote
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    editNote(request, response) {
        try {
            if (request.body.title === undefined || request.body.description === undefined)
                throw 'Cannot be undefined'
            if (request.body.title === null || request.body.description === null)
                throw 'Cannot be null'

            logger.info("request in edit note +" + JSON.stringify(request.body));
            request.check('noteId', 'Must be in the mongoose unique Id format')
                .matches(/^[0-9a-fA-F]{24}$/)

            var errors = request.validationErrors();
            var result = {};
            // logger.info("errors " + JSON.stringify(errors))
            if (errors) {

                result.error = errors;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                logger.info("noteId" + request.params.noteId)
                var editObject = {}
                var idObject = {
                    "noteId": request.params.noteId,
                    "userId": request.body.data._id
                }
                logger.info("before if " + JSON.stringify(request.body));
                if ("title" in request.body && "description" in request.body && "color" in request.body &&
                    "isArchive" in request.body && "isPinned" in request.body && "isTrash" in request.body &&
                    "name" in request.body.color && "code" in request.body.color) {
                    logger.info("edit note object 1" + JSON.stringify(editObject));

                    editObject.title = request.body.title,
                        editObject.description = request.body.description,
                        editObject.color = {
                            name: request.body.color.name,
                            code: request.body.color.code
                        }
                    editObject.isArchive = request.body.isArchive,
                        editObject.isPinned = request.body.isPinned,
                        editObject.isTrash = request.body.isTrash

                    var result = {};
                    logger.info("edit note object 2" + JSON.stringify(editObject));
                    noteService.editNote(idObject, editObject)
                        .then(data => {
                            if (data !== null) {
                                result.success = true;
                                result.message = "Update Successfully";
                                result.data = data;
                                return response.status(200).send(result)
                            }
                            else {
                                result.success = true;
                                result.message = "No note found with the specified id";
                                result.data = data;
                                return response.status(404).send(result);
                            }
                        })
                        .catch(error => {
                            logger.info("error in ctrl " + error)
                            result.success = false;
                            result.message = "Error Occured";
                            result.error = error;
                            return response.status(500).send(result)
                        })
                }
                else {
                    result.success = false;
                    result.message = "Please add all the fields";
                    result.error = "Please add all the fields";
                    return response.status(400).send(result);
                }

            }
        }
        catch (error) {
            var result = {};
            result.success = false;
            result.message = "Some error";
            result.error = error;
            return response.status(400).send(result)
        }
    }

    /**
     * @description This function is called to add reminder to note by calling service function
     * @function    addRemainder
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    addRemainder(request, response) {
        try {

            if (request.body.remainder === undefined || request.body.remainder === null)
                throw 'Cannot be undefined or null'
            request.check('noteId', 'Must be in the mongoose unique Id format')
                .matches(/^[0-9a-fA-F]{24}$/)

            var errors = request.validationErrors();
            var result = {};
            logger.info("errors " + JSON.stringify(errors))
            if (errors) {

                result.error = errors[0].msg;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                var addRemainderObject = {
                    "noteId": request.params.noteId,
                    "remainder": request.body.remainder,
                    "userId" : request.body.data._id
                }

                noteService.addRemainder(addRemainderObject)
                    .then((data) => {
                        if (data !== null) {
                            logger.info("data in control " + data);
                            result.success = true;
                            result.message = "Successfully added remainder";
                            result.data = data;
                            return response.status(200).send(result);
                        }
                        else if (data === null) {
                            result.success = true;
                            result.message = "No note found with given note id";
                            result.data = data;
                            return response.status(404).send(result);
                        }
                        else if (data.length === 0) {
                            logger.info("data in ctrl " + data);
                            result.success = false;
                            result.message = "Remainder is not added";
                            result.error = "error"
                            return response.status(400).send(result);
                        }
                    })
                    .catch(error => {
                        logger.info("error in ctrl " + error);
                        result.success = false;
                        result.message = "Some error ocurred while adding remainder";
                        result.error = error;
                        return response.status(500).send(result);
                    })
            }
        }
        catch (error) {
            var result = {};
            result.success = false;
            result.message = "Some error";
            result.error = error;
            return response.status(400).send(result)
        }
    }

    /**
     * @description This function is called to delete reminder from note by calling service function
     * @function    deleteReminder
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    deleteReminder(request, response) {
        request.check('noteId', 'Must be in the mongoose unique Id format')
            .matches(/^[0-9a-fA-F]{24}$/)

        var errors = request.validationErrors();
        var result = {};
        logger.info("errors " + JSON.stringify(errors))
        if (errors) {

            result.error = errors[0].msg;
            result.success = false;
            return response.status(400).send(result);
        }
        else {
            var removeReminderObject = {
                "noteId": request.params.noteId,
                "remainder": request.body.remainder,
                "userId": request.body.data._id
            }

            noteService.removeReminder(removeReminderObject)
                .then((data) => {
                    if (data !== null) {
                        logger.info("data in control " + data);
                        result.success = true;
                        result.message = "Successfully deleted reminder";
                        result.data = data;
                        return response.status(200).send(result);
                    }
                    else if (data === null) {
                        result.success = true;
                        result.message = "No note found with given note id";
                        result.data = data;
                        return response.status(404).send(result);
                    }
                    else if (data.length === 0) {
                        logger.info("data in ctrl " + data);
                        result.success = false;
                        result.message = "Reminder is not be deleted";
                        result.error = "error"
                        return response.status(400).send(result);
                    }
                })
                .catch(error => {
                    logger.info("error in ctrl " + error);
                    result.success = false;
                    result.message = "Some error ocurred while deleting remainder";
                    result.error = error;
                    return response.status(500).send(result);
                })
        }
    }

    /**
     * @description This function is called to search notes by calling service function
     * @function    search
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    search(request, response) {
        try {
            if (request.body.value === undefined || request.body.value === null)
                throw 'Search data cannot be null or undefined'

            request.check('value', 'Cannot be empty').notEmpty()

            var errors = request.validationErrors();
            var result = {};
            logger.info("errors " + JSON.stringify(errors))
            if (errors) {

                result.error = errors[0].msg;
                result.success = false;
                return response.status(400).send(result);
            }
            else {

                var result = {};
                logger.info("request " + JSON.stringify(request.body));

                var searchObject = {
                    "userId": request.body.data._id,
                    "value": request.body.value
                }

                noteService.search(searchObject)
                    .then((data) => {
                        if (data.length === 0 || data === null) {
                            logger.info("data in ctrl " + data);
                            result.success = false;
                            result.message = "Data not found";
                            result.error = "error"
                            return response.status(404).send(result);
                        }
                        else if (data !== null) {
                            logger.info("data in control " + data);
                            result.success = true;
                            result.message = "Data found";
                            result.data = data;
                            return response.status(200).send(result);
                        }
                    })
                    .catch(error => {
                        logger.info("error in ctrl " + error);
                        result.success = false;
                        result.message = "Some error ocurred while searching";
                        result.error = error;
                        return response.status(500).send(result);
                    })
            }
        }
        catch (error) {
            var result = {};
            result.success = false;
            result.message = "Some error";
            result.error = error;
            return response.status(400).send(result)

        }
    }

    /**
     * @description This function is called to add label to note by calling service function
     * @function    addLabelToNote
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    addLabelToNote(request,response) {
        try {
            if(request.body.label === undefined || request.body.label === null) throw "Request body cannot be undefined"
            request.check('label','Label cannot be m empty').notEmpty();
            var errors = request.validationErrors();
            var result = {};
            logger.info("errors " + JSON.stringify(errors))
            if (errors) {
                result.error = errors[0].msg;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                let addLabelObject = {
                    'label' : request.body.label,
                    'userId': request.body.data._id,
                    'noteId': request.params.noteId,
                    'labelId' : request.body.labelId || null
                }
                noteService.addLabelToNote(addLabelObject).then(data=>{
                    if(data !== null) {
                        result.success = true;
                        result.message = "Added label Successfully";
                        result.data = data;
                        return response.status(200).send(result);
                    }
                    else {
                        result.success = false;
                        result.message = "Not added label";
                        return response.status(400).send(result);
                    }
                })
                .catch(error =>{
                    result.success = false;
                    result.message = "Error Occurred";
                    result.error = error;
                    return response.status(500).send(result);
                })
            }
        }
        catch(error) {
            var result = {};
            result.success = false;
            result.message = "Some error";
            result.error = error;
            return response.status(400).send(result)
        }
    }

    /**
     * @description This function is called to delete label from note by calling service function
     * @function    deleteLabelFromNote
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    deleteLabelFromNote(request,response) {
        try {   
            logger.info("in ctrl "+JSON.stringify(request.body)+ " " +JSON.stringify(request.params));
            var result = {};
            if("noteId" in request.params && "labelId" in request.body) {
                let removeLabelObject = {
                    'noteId': request.params.noteId,
                    'labelId':request.body.labelId,
                    'userId':request.body.data._id
                }
                noteService.deleteLabelFromNote({"_id":removeLabelObject.noteId},removeLabelObject).then(data=>{
                    if(data !== null) {
                        result.success = true;
                        result.message = "Delete label Successfully";
                        result.data = data;
                        return response.status(200).send(result);
                    }
                    else {
                        result.success = false;
                        result.message = "Label note deleted";
                        return response.status(400).send(result);
                    }
                })
                .catch(error =>{
                    result.success = false;
                    result.message = "Error Occurred";
                    result.error = error;
                    return response.status(500).send(result);
                })
            }
        }
        catch(error) {
            var result = {};
            result.success = false;
            result.message = "Some error";
            result.error = error;
            return response.status(400).send(result)
        }
    }

    /**
     * @description This function is called to set notes in redis cache
     * @function    noteSequencing
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    noteSequencing(request,response) {
        logger.info("request in noteSequencing "+JSON.stringify(request.body));
        redisCache.set('getAllNotes'+request.body.data._id,JSON.stringify(request.body),(reply)=>{
            if (reply) {
                logger.info("data from redis==> "+ reply);
                result.success = true;
                result.message = "Notes found";
                result.data = JSON.parse(reply);
                return response.status(200).send(result);
            }
        })
        redisCache.get('getAllNotes'+request.body.data._id , (error, reply) => {
            if (reply) {
                logger.info("data from redis==> "+ reply);
            }
        })
        response.status(200).send('successful');
    }

    // getAllReminder()
}

module.exports = new Controller();