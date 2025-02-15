/**
 * @description This file contains API class.
 * @file        app.model.label.js
 * @overview    The API function take in request and perform the operation and sends back
 *              response to the service file
 * @author      Sindooja Gajam
 * @version     node v12.10.0 
 * @since       20 January 2020            
 */

/**
 * @const       mongoose Mongoose constant having the `mongoose` module
 */

const mongoose = require('mongoose');
var logger = require('../../config/winston');

const LabelSchema = mongoose.Schema({
    userId: {
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

class Api {

    /**
     * @description This function is called to create label
     * @param {*} request
     */
    create(request) {
        let createLabel = new label({
            "label": request.label,
            "userId": request.userId
        })
        return new Promise(function (resolve, reject) {
            createLabel.save().then((data) => {
                resolve(data)
            })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /**
     * @description This function is called to read labels
     * @param {*} request
     * @returns {*} data
     */
    async read(request) {
        var data = await label.find(request)
        return data;
    }

    /**
     * @description This function is called to delete label
     * @param {*} request
     * @returns {*} data
     */
    async delete(request) {
        var data = await label.findByIdAndRemove(request);
        return data;
    }

    /**
     * @description This function is called to delete label
     * @param {*} request This contains the id's 
     * @param {*} request This object contains data to be updated
     */
    update(labelId, dataToUpdate) {
        return new Promise((resolve, reject) => {
            label.findOneAndUpdate(labelId, dataToUpdate, { "new": true })
                .then(data => {
                    return resolve(data)
                })
                .catch(error => {
                    return reject(error);
                })
        })
    }
}


module.exports = new Api();