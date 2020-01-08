/**
 * @description This file contains API class.
 * @file        app.model.user.js
 * @overview    The API function take in request and perform the operation and sends back
 *              response to the service file
 * @author      Sindooja Gajam
 * @version     node v12.10.0 
 * @since       16 December 2019            
 */

/**
 * @const       mongoose Mongoose constant having the `mongoose` module
 */

const mongoose = require('mongoose');
var logger       = require('../../config/winston');
const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'firstName is required']
    },
    description: {
        type: String,
        required: [true, 'lastName is required']
    },
    userId: {
        type: String
        // ,
        // required: [true, 'UserId is required']
    },
    remainder: {
        type: String,
        default: null
    },
    pinned: {
        type: Boolean,
        default: false
    },
    archive: {
        type: Boolean,
        default: false
    },
    addImage: {
        type: String,
        default: null
    }
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
            "userId" : request.userId
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
       var data = await Note.find(request)
       return data;
    }
}

module.exports = new NoteApi();