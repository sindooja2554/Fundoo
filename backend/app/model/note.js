/**
 * @description This file contains API class.
 * @file        app.model.note.js
 * @overview    The API function take in request and perform the operation and sends back
 *              response to the service file
 * @author      Sindooja Gajam
 * @version     node v12.10.0
 * @since       16 January 2020
 */

/**
 * @const       mongoose Mongoose constant having the `mongoose` module
 */

const mongoose = require("mongoose");
const schema = mongoose.Schema;
var logger = require("../../config/winston");
const NoteSchema = schema(
  {
    title: {
      type: String,
      required: [true, "firstName is required"],
    },
    description: {
      type: String,
      required: [true, "lastName is required"],
    },
    userId: {
      type: String,
      required: true,
    },
    remainder: {
      type: String,
      default: null,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
    addImage: {
      type: String,
      default: null,
    },
    isTrash: {
      type: Boolean,
      default: false,
    },
    color: {

      type: Object,
      default: {
        name: "white",
        code: "#FFFFFF",
      },
    },
    labels: [
      {
        type: schema.Types.ObjectId,
        ref: "label",
        default: [],
      },
    ],
    collaborator: [
      {
        type: schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

var Note = mongoose.model("Note", NoteSchema);

class NoteApi {
  /**
   * @description This function is called to create note
   * @param {*} request
   */
  create(request) {
    let createNote = new Note({
      title: request.title,
      description: request.description,
      userId: request.userId,
      color: {
        name: request.color.name,
        code: request.color.code,
      },
      isArchive: request.isArchive,
      isPinned: request.isPinned,
      isTrash: request.isTrash,
      remainder: request.remainder,
    });
    return new Promise(function (resolve, reject) {
      createNote
        .save()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @description This function is called to read notes
   * @param {*} request
   * @returns {*} data
   */
  async read(request) {
    var data = await Note.find(request)
      .populate("labels")
      .populate("collaborator");
    return data;
  }

  /**
   * @description This function is called to delete note
   * @param {*} request
   * @returns {*} data
   */
  async delete(request) {
    var data = await Note.findByIdAndRemove(request);
    return data;
  }

  /**
   * @description This function is called to delete note
   * @param {*} request This contains the id's
   * @param {*} request This object contains data to be updated
   */
  update(noteId, dataToUpdate) {
    return new Promise((resolve, reject) => {
      Note.findOneAndUpdate(noteId, dataToUpdate, { new: true })
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

module.exports = new NoteApi();