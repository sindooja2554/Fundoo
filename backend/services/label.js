/**
 * @description This file contains service class.
 * @file        services.label.js
 * @overview    The service class gives call to API class according to the request.
 * @author      Sindooja Gajam
 * @version     node v12.10.0
 * @since       20 January 2020
 */

var labelModel = require("../app/model/label");
var noteService = require("../services/note");
var logger = require("../config/winston");

class Service {
  /**
   * @description This function is called to create label by calling the create API
   * @param {*} request
   */
  createLabel(request) {
    logger.info("request in service " + request);
    console.log("request in service ", request);
    var result = {};
    return new Promise(function (resolve, reject) {
      labelModel
        .read(
          {
            label: request.label,
          },
          {
            userId: request.userId,
          }
        )
        .then((data) => {
          logger.info("data after reading " + data.length);
          if (data.length === 0) {
            labelModel
              .create(request)
              .then((data) => {
                if (data !== null) {
                  return resolve(data);
                } else {
                  return reject(data);
                }
              })
              .catch((error) => {
                logger.info("data from serv " + error);
                console.log("data from serv ", error);
                return reject(error);
              });
          } else {
            return reject("Label already exists");
          }
        })
        .catch((error) => {
          logger.info("data from service " + error);
          console.log("data from service ", error);
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to get all labels according to userId by calling read API
   * @param {*} request
   */
  async getAllLabels(request) {
    logger.info("request in service " + JSON.stringify(request));
    return new Promise(function (resolve, reject) {
      labelModel
        .read({
          userId: request.userId,
        })
        .then((data) => {
          logger.info("response data in service " + JSON.stringify(data));
          logger.info("length " + data.length);
          if (data.length === 0) {
            return resolve(data);
          } else if (data !== null) {
            return resolve(data);
          }
        })
        .catch((error) => {
          logger.info("error " + error);
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to delete label by calling the delete API
   * @param {*} request
   */
  deleteLabel(request) {
    logger.info("request in service " + JSON.stringify(request));
    return new Promise(function (resolve, reject) {
      labelModel
        .delete({
          _id: request.labelId,
        })
        .then((data) => {
          if (data !== null) {
            logger.info("response in label service" + data);
            noteService
              .deleteLabel(
                {
                  labels: request.labelId,
                },
                data
              )
              .then((response) => {
                if (response !== null) {
                  logger.info("-----------------");
                  return resolve(response);
                } else if (response === null) {
                  return resolve(data);
                } else {
                  return reject(response);
                }
              })
              .catch((error) => {
                logger.error("error " + error);
                return reject(error);
              });
          } else {
            logger.info("error in service " + data);
            return resolve(data);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to edit label by calling the update API
   * @param {*} request
   */
  editLabel(editObject) {
    logger.info("edit obj " + JSON.stringify(editObject.labelId));
    var noteIdObject = {};
    return new Promise((resolve, reject) => {
      labelModel
        .update(
          {
            _id: editObject.labelId,
          },
          {
            label: editObject.label,
          }
        )
        .then((data) => {
          if (data !== null) {
            logger.info("data in label service " + JSON.stringify(data));
            return resolve(data);
          } else {
            logger.info("error in service " + data);
            return reject(data);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

module.exports = new Service();
