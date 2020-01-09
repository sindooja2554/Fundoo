var labelService = require('../services/label');
var logger = require('../config/winston');

class Controller
{
    createLabel(request,response)
    {
        var result = {};
        logger.info("noteId " +request.params.noteId);
        logger.info("request in ctrl "+request.body);
        try {
            if (request.body.label === null) throw 'Request body cannot be null';
            if (request.body.label === undefined) throw 'Request body cannot be undefined';

            request.check('label', 'title cannot be empty')
                .notEmpty()
            var errors = request.validationErrors();
            if (errors) {

                result.error = errors;
                result.success = false;
                return response.status(400).send(result);
            }
            else{
                let createLabelObject = {
                    'label': request.body.label,
                    'noteId': request.params.noteId,
                    'userId': request.body.data._id
                }
                logger.info("userId "+createLabelObject.userId )
                labelService.createLabel(createLabelObject).then((data)=>{
                    if(data !== null)
                    {
                        result.data = data;
                        result.success = true;
                        result.message = 'Label Successfully Created'
                        return response.status(200).send(result);
                    }
                    else
                    {
                        result.error = error;
                        result.success = false;
                        result.message = 'Label Was not Created'
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
    getAllLabels(request,response)
    {
        var result = {};
        logger.info("request "+ request.body.data._id);
        let getLabelsObject = {
            'userId' : request.body.data._id
        }
        logger.info("getLabelsObject "+JSON.stringify(getLabelsObject));
        labelService.getAllLabels(getLabelsObject)
        .then((data)=>{
            if(data!==null)
            {
                logger.info("response "+JSON.stringify(data));
                result.success = true;
                result.message = "Labels found";
                result.data = data;
                return response.status(200).send(result)
            }
            else
            {
                result.success = false;
                result.message = "No Labels found";
                result.data = data;
                return response.status(500).send(result)
            }
        })
        .catch(error=>{
            logger.info("error "+error)
            result.success = false;
            result.message = "Error Occured";
            result.error = error;
            return response.status(500).send(result)
        })
    }

    deleteLabel(request,response)
    {
        var result = {};
        logger.info("labelId " +request.params.labelId);
        // logger.info("request.body.data._id "+JSON.stringify(request.body.data._id));
        let deleteLabelObject = {
            'labelId' : request.params.labelId
        }
        logger.info("delete object "+JSON.stringify(deleteLabelObject));
        labelService.deleteLabel(deleteLabelObject)
        .then((data)=>{
            if(data !== null)
            {
                logger.info("response "+JSON.stringify(data));
                result.success = true;
                result.message = "Deleted Successfully";
                result.data = data;
                return response.status(200).send(result)
            }
            else
            {
                logger.info("data==> "+data)
                result.success = false;
                result.message = "Delete Operation failed";
                result.data = data;
                return response.status(500).send(result)
            }
        })
        .catch(error=>{
            logger.info("response "+error);
            result.success = false;
            result.message = "Error Occured";
            result.error = error;
            return response.status(500).send(result)
        })
        // logger.log("response "+JSON.stringify(data));
    }

    editLabel(request,response) 
    {
        // var editObject={}
        var editObject = {
            "labelId" : request.params.noteId,
            "label" : request.body.label
        }
        // if(request.body.description !== undefined )
        // {
        //     editObject.description = request.body.description;
        // }
        // if(request.body.title !== undefined)
        // {
        //     editObject.title = request.body.title;
        // }

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