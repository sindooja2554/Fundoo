var noteService = require('../services/note');
var logger = require('../config/winston');

class Controller {
    createNote(request, response) {
        logger.info("request in ctrl " + request.body);
        console.log("request in ctrl ", request.body)
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
            request.check('color', 'Color cannot be empty').notEmpty()
            // request.check('userId','user id cannot be empty').notEmpty();
            // request.check('noteId', 'Note id should be in mongoose id format')
            //     .matches(/^[0-9a-fA-F]{24}$/)
            var result = {};
            var errors = request.validationErrors();
            if (errors) {

                result.error = errors;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                let createNoteObject = {
                    'title': request.body.title,
                    'description': request.body.description,
                    'userId': request.body.data._id
                }
                logger.info("userId " + createNoteObject.userId)
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
        }
        catch (error) {
            return response.status(400).send(error)
        }
    }

    getAllNotes(request, response) {
        var result = {};
        logger.info("request " + request.body);
        let getNotesObject = {
            'userId': request.body.data._id
        }
        logger.info("getNotesObject " + JSON.stringify(getNotesObject));
        noteService.getAllNotes(getNotesObject)
            .then((data) => {
                if (data.length === 0) {
                    result.success = true;
                    result.message = "No notes found";
                    result.data = data;
                    return response.status(404).send(result)
                }
                else if (data !== null) {
                    logger.info("response " + JSON.stringify(data));
                    result.success = true;
                    result.message = "Notes found";
                    result.data = data;
                    return response.status(200).send(result)
                }
            })
            .catch(error => {
                result.success = false;
                result.message = "Error Occured";
                result.error = error;
                return response.status(500).send(result)
            })
    }

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
        catch(error)
        {
            result.error = error;
            result.success = false;
            return response.status(400).send(result)
        }
        

    }

    editNote(request, response) {
        request.check('noteId', 'Must be in the mongoose unique Id format')
            .matches(/^[0-9a-fA-F]{24}$/)

        var errors = request.validationErrors();
        var result = {};
        logger.info("errors " + errors)
        if (errors) {

            result.error = errors;
            result.success = false;
            return response.status(400).send(result);
        }
        else {
            var editObject = {}
            var idObject = {
                "noteId": request.params.noteId,
                "userId": request.body.data._id
            }
            // if (request.body.description !== undefined) {
            //     editObject.description = request.body.description;
            // }
            // if (request.body.title !== undefined) {
            //     editObject.title = request.body.title;
            // }
            // if (request.body.isTrash !== undefined) {
            //     editObject.isTrash = true;
            // }

            if("title" in request.body && "description" in request.body && "color" in request.body &&
            "isArchive" in request.body && "isPinned" in request.body && "isTrash" in request.body)
            {
                // let editObject = 
                // { 
                    editObject.title = request.body.title,
                    editObject.description = request.body.description,
                    editObject.color = request.body.color,
                    editObject.isArchive = request.body.isArchive,
                    editObject.isPinned = request.body.isPinned,
                    editObject.isTrash = request.body.isTrash
                // }
            }

            var result = {};
            logger.info("edit note object " + JSON.stringify(editObject));
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
    }

    addRemainder(request, response) {
        console.log("request to save remainder",request.body);
        // request.check('remainder', 'Must be in valid format [eg.(22-05-2013 11:23:22)]')
        //     .matches(/^(\d{2})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2}):(\d{2})$/);
        request.check('noteId', 'Must be in the mongoose unique Id format')
            .matches(/^[0-9a-fA-F]{24}$/)

        var errors = request.validationErrors();
        console.log("er==>",errors)
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
                "remainder": request.body.remainder
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
                        result.message = "Remainder is not be added";
                        result.error = "error"
                        return response.status(400).send(result);
                    }
                })
                .catch(error => {
                    logger.info("error in ctrl " + error);
                    result.success = false;
                    result.message = "Some error ocurred while adding remainder";
                    result.data = data;
                    return response.status(500).send(result);
                })
        }
    }
}

module.exports = new Controller();