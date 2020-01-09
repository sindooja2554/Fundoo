var noteService = require('../services/note');
var logger = require('../config/winston');

class Controller
{
    createNote(request,response)
    {
        logger.info("request in ctrl "+request.body);
        console.log("request in ctrl ",request.body)
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
            // request.check('userId','user id cannot be empty').notEmpty();
            // request.check('userId','User id should be in mongoose id format')
            // .matches(/^[0-9a-fA-F]{24}$/)
            var result = {};
            var errors = request.validationErrors();
            var result = {};
            // console.log(errors);
            if (errors) {

                result.error = errors;
                result.success = false;
                return response.status(400).send(result);
            }
            else{
                let createNoteObject = {
                    'title': request.body.title,
                    'description': request.body.description,
                    'userId': request.body.data._id
                }
                logger.info("userId "+createNoteObject.userId )
                noteService.createNote(createNoteObject).then((data)=>{
                    if(data !== null)
                    {
                        result.data = data;
                        result.success = true;
                        result.message = 'Note Successfully Created'
                        return response.status(200).send(result);
                    }
                    else
                    {
                        result.error = error;
                        result.success = false;
                        result.message = 'Note Was not Created'
                        return response.status(400).send(result);
                    }

                })
                .catch((error)=>{
                    result.error = error;
                    result.success = false;
                    result.message = 'Error'
                    return response.status(500).send(result);
                })
            }
        }
        catch(error)
        {
            return response.status(400).send(error)
        }
    }

    // async 
    getAllNotes(request,response)
    {
        var result = {};
        logger.info("request "+request.body);
        console.log("request ",request.body);
        let getNotesObject = {
            'userId' : request.body.data._id
        }
        // var data = await noteService.getAllNotes(getNotesObject);
        // console.log("in ctrl" ,data);
        // logger.info("in ctrl" +data);
        // if(data.length === 0 )
        // {
        //     result.success = true;
        //     result.message = "No notes found"
        //     return response.status(200).send(result)
        // }else if(data !== null){
        //     result.success = true;
        //     result.data = data
        //     result.message = "Notes found"
        //     return response.status(200).send(result)
        // }
        logger.info("getNotesObject "+JSON.stringify(getNotesObject));
        noteService.getAllNotes(getNotesObject)
        .then((data)=>{
            if(data!==null)
            {
                logger.info("response "+JSON.stringify(data));
                result.success = true;
                result.message = "Notes found";
                result.data = data;
                return response.status(200).send(result)
            }
            else
            {
                result.success = false;
                result.message = "No notes found";
                result.data = data;
                return response.status(500).send(result)
            }
        })
        .catch(error=>{
            result.success = false;
            result.message = "Error Occured";
            result.error = error;
            return response.status(500).send(result)
        })
    }

    deleteNote(request,response)
    {
        var result = {};
        logger.info("noteId " +request.params.noteId);
        logger.info("request.body.data._id "+JSON.stringify(request.body.data._id));
        let deleteNoteObject = {
            'userId' : request.body.data._id,
            'noteId' : request.params.noteId
        }
        logger.info("delete object "+JSON.stringify(deleteNoteObject));
        noteService.deleteNote(deleteNoteObject)
        .then((data)=>{
            if(data!==null)
            {
                logger.log("response "+JSON.stringify(data));
                result.success = true;
                result.message = "Deleted Successfully";
                result.data = data;
                return response.status(200).send(result)
            }
            else
            {
                result.success = false;
                result.message = "Delete Operation failed";
                result.data = data;
                return response.status(500).send(result)
            }
        })
        .catch(error=>{
            result.success = false;
            result.message = "Error Occured";
            result.error = error;
            return response.status(500).send(result)
        })
        // logger.log("response "+JSON.stringify(data));
    }

    editNote(request,response) 
    {
        var editObject={}
        var idObject = {
            "noteId" : request.params.noteId,
            "userId" : request.body.data._id
        }
        // logger.info("request in controller" +JSON.stringify(request.body));
        // var editObject = JSON.stringify(request.body);
        // logger.info("edit Object "+editObject)
        // logger.info("request length "+Object.keys(request.body).length);
        if(request.body.description !== undefined )
        {
            editObject.description = request.body.description;
        }
        if(request.body.title !== undefined)
        {
            editObject.title = request.body.title;
        }
        // switch()

            // "noteId" : request.params.noteId,
            // "userId" : request.body.data._id,
            // "title"  : request.body.title,
            // "description" : request.body.description

        var result={};
        logger.info("edit note object "+JSON.stringify(editObject));
        noteService.editNote(idObject,editObject)
        .then(data=>{
            if(data!== null)
            {
                result.success = true;
                result.message = "Update Successfully";
                result.data = data;
                return response.status(200).send(result)
            }
        })
        .catch(error=>{
            logger.info("error in ctrl "+error)
            result.success = false;
            result.message = "Error Occured";
            result.error = error;
            return response.status(500).send(result)
        })
    }
}

module.exports = new Controller();