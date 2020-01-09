/**
 * @description This file contains API class.
 * @file        app.model.user.js
 * @overview    The API function take in request and perform the operation and sends back
 *              response to the service file
 * @author      Sindooja Gajam
 * @version     node v12.10.0 
 * @since       7 January 2019            
 */

/**
 * @const       mongoose Mongoose constant having the `mongoose` module
 */

const mongoose = require('mongoose');
var logger     = require('../../config/winston');

const LabelSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    noteId: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
});

var label = mongoose.model('label', LabelSchema);

class Api
{
    create(request)
    {
        let createLabel = new label({
            "noteId": request.noteId,
            "label": request.label,
            "userId" : request.userId
        })
        return new Promise(function(resolve, reject) {
            createLabel.save().then((data) => {
                logger.info("data from model " + data);
                resolve(data)
            })
            .catch((error) => {
                logger.info("data from model "+ error)
                reject(error)
            })
        })
    }

    async read(request)
    {
       var data = await label.find(request)
       return data;
    }

    async delete(request)
    {
        logger.info("request in model "+request)
        var data = await label.findByIdAndRemove(request);
        logger.info("response data " +JSON.stringify(data))
        return data;
    }

    update(noteId,dataToUpdate)
    {
        logger.info("id "+JSON.stringify(noteId));
        logger.info("update "+JSON.stringify(dataToUpdate))
        return new Promise((resolve,reject)=>{
            Note.findOneAndUpdate(noteId,dataToUpdate,{"new":true})
            .then(data=>{
                logger.info("data in model "+data);
                return resolve(data)
            })
            .catch(error=>{
                logger.info("error in model "+error)
                return reject(error);
            })
        })
    }
}


module.exports = new Api();