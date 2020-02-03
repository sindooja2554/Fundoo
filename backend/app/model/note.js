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
const schema = mongoose.Schema;
var logger       = require('../../config/winston');
const NoteSchema = schema({
    title: {
        type: String,
        required: [true, 'firstName is required']
    },
    description: {
        type: String,
        required: [true, 'lastName is required']
    },
    userId: {
        type: String,
        required: true
    },
    remainder: {
        type: String,
        default: null
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    addImage: {
        type: String,
        default: null
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    color: {
        // code : "#FFFFFF",
        // name : "white"
        type: Object,
        default: {
            name : "white",
            code : "#FFFFFF"
        }
    },
    labels: [{
        type: schema.Types.ObjectId,
        ref : "label",
        default: []
        // type:Array
    }]
},
    {
        timestamps: true
});

var Note = mongoose.model('Note', NoteSchema);

class NoteApi
{
    create(request)
    {
        let createNote = new Note({
            "title": request.title,
            "description": request.description,
            "userId" : request.userId,
            "color": {
                "name": request.color.name,
                "code": request.color.code
            },
            "isArchive":request.isArchive,
            "isPinned":request.isPinned,
            "isTrash":request.isTrash,
            "labels":request.labels
        })
        return new Promise(function(resolve, reject) {
            createNote.save().then((data) => {
                logger.info("data from model " + data);
                resolve(data)
            })
            .catch((error) => {
                console.log("data from model ", error)
                reject(error)
            })
        })
    }

    async read(request)
    {
       var data = await Note.find(request).populate("labels")
    //    console.log(data);
       return data;
    }

    async delete(request)
    {
        logger.info("request in model "+request)
        var data = await Note.findByIdAndRemove(request);
        logger.info("response data " +JSON.stringify(data))
        return data;
    }

    update(noteId,dataToUpdate)
    {
        logger.info("id "+JSON.stringify(noteId));
        logger.info("update "+JSON.stringify(dataToUpdate))
        console.log("update ", dataToUpdate);
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

module.exports = new NoteApi();