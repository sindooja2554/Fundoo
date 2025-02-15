/**
 * @description API controller Class
 * @file        controller.label.js
 * @overview    API controller class controls all the API's, gives call to
 *              service functions of the API's
 * @author      Sindooja Gajam
 * @version     node v12.10.0
 * @since       20 January 2020
 */
var labelService = require('../services/label');
var logger       = require('../config/winston');

class Controller {

    /**
     * @description This function is called to create label by calling the service function
     * @function    createLabel
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    createLabel(request, response) {
        logger.info("request.. " + JSON.stringify(request.body))
        try {
            var result = {};
            if (request.body.label === null) throw 'Request body cannot be null';
            if (request.body.label === undefined) throw 'Request body cannot be undefined';

            request.check('label', 'label cannot be empty')
                .notEmpty()

            var errors = request.validationErrors();
            if (errors) {

                result.error = errors;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                let createLabelObject = {
                    'label': request.body.label,
                    'userId': request.body.data._id
                }
                labelService.createLabel(createLabelObject).then((data) => {
                    if (data !== null) {
                        result.data = data;
                        result.success = true;
                        result.message = 'Label Successfully Created'
                        return response.status(200).send(result);
                    }
                    else {
                        result.error = error;
                        result.success = false;
                        result.message = 'Label Was not Created'
                        return response.status(404).send(result);
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

    /**
     * @description This function is called to get all labels by calling the service function
     * @function    getAllLabels
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */

    getAllLabels(request, response) {
        var result = {};
        var result = {};
        logger.info("request " + request.body.data._id);
        let getLabelsObject = {
            'userId': request.body.data._id,
        }
        labelService.getAllLabels(getLabelsObject)
            .then((data) => {
                if (data === null || data.length === 0) {
                    result.success = true;
                    result.message = "No Labels found";
                    result.data = data;
                    return response.status(404).send(result)
                }
                else if (data !== null) {
                    result.success = true;
                    result.message = "Labels found";
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

    /**
     * @description This function is called to delete labels by calling the service function
     * @function    deleteLabel
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    deleteLabel(request, response) {
        try {
            if (request.params.labelId === "null") throw 'Request body cannot be null';
            if (request.params.labelId === undefined) throw 'Request body cannot be undefined';
            request.check('labelId', 'Must be in the mongoose unique Id format')
                .matches(/^[0-9a-fA-F]{24}$/)
            var result = {};
            var errors = request.validationErrors();
            if (errors) {
                result.error = errors[0].msg;
                result.success = false;
                return response.status(400).send(result);
            }
            else {
                let deleteLabelObject = {
                    'labelId': request.params.labelId,
                    'userId' : request.body.data._id
                }
                labelService.deleteLabel(deleteLabelObject)
                    .then((data) => {
                        if (data !== null) {
                            result.success = true;
                            result.message = "Deleted Successfully";
                            result.data = data;
                            return response.status(200).send(result)
                        }
                        else {
                            result.success = false;
                            result.message = "No label found"                             // "Delete Operation failed";
                            result.data = data;
                            return response.status(404).send(result)
                        }
                    })
                    .catch(error => {
                        logger.info("Error " + error);
                        result.success = false;
                        result.message = "Error Occured";
                        result.error = error;
                        return response.status(500).send(result)
                    })
            }
        }
        catch (error) {
            logger.info("error " + error)
            return response.status(400).send(error)
        }
    }

    /**
     * @description This function is called to edit labels by calling the service function
     * @function    editLabel
     * @param {*}   request
     * @param {*}   response
     * @returns {*} response
     */
    editLabel(request, response) {
        request.check('labelId', 'Must be in the mongoose unique Id format')
            .matches(/^[0-9a-fA-F]{24}$/)
        var errors = request.validationErrors();
        var result = {};
        if (errors) {
            result.error = errors[0].msg;
            result.success = false;
            return response.status(400).send(result);
        }
        else {
            var editObject = {
                "labelId": request.params.labelId,
                "label": request.body.label,
                "noteId": request.body.noteId
            }
            var result = {};
            logger.info("edit note object " + JSON.stringify(editObject));
            labelService.editLabel(editObject)
                .then(data => {
                    if (data !== null) {
                        result.success = true;
                        result.message = "Update Successfully";
                        result.data = data;
                        return response.status(200).send(result)
                    }
                    else {
                        result.success = false;
                        result.message = "Label Id not found";
                        result.data = data;
                        return response.status(404).send(result)
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
}

module.exports = new Controller(); 