/**
 * @description This file contains service class.
 * @file        services.user.js
 * @overview    The service class gives call to API class according to the request.
 * @author      Sindooja Gajam
 * @version     node v12.10.0
 * @since       16 December 2019
 */
var userModel = require("../app/model/user");
var bcrypt = require("../utility/bcrypt");
var logger = require("../config/winston");
require("dotenv").config();

class Services {
  /**
   * @description This function is called to register the user.
   * @function    createService
   * @param {}    request
   */
  createService(request) {
    var res = {};
    return new Promise(function (resolve, reject) {
      userModel.findOne({ email: request.email }, (error, data) => {
        if (error) {
          reject(error);
        } else if (data === null) {
          bcrypt.encryptPassword(
            request.password,
            (error, encryptedPassword) => {
              if (error) {
                reject(error);
              } else {
                request.password = encryptedPassword;
                userModel
                  .create(request)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              }
            }
          );
        } else {
          res.message = "Already registered";
          res.success = false;
          res.data = data;
          return resolve(res);
        }
      });
    });
  }

  /**
   * @description This function is called whenrequest the user want to login.\
   * @function    readServicerequest
   * @param {*}   request
   * @param {*}   callback
   */

  loginService(request, callback) {
    var res = {};
    userModel.findOne({ email: request.email }, (error, data) => {
      if (error) {
        return callback(error);
      } else if (data === null) {
        res.message = "Please register to login";
        res.success = false;
        res.data = data;
        return callback(null, res);
      } else if (data.isVerified === true) {
        bcrypt.comparePassword(
          request.password,
          data.password,
          (error, success) => {
            if (error) {
              return callback(error);
            } else if (success === false) {
              res.message = "Password did not match";
              res.success = false;
              return callback(null, res);
            } else {
              res.success = true;
              res.data = data;
              return callback(null, res);
            }
          }
        );
      } else {
        res.message = "Please verify your email to login";
        res.success = false;
        res.data = data;
        return callback(null, res);
      }
    });
  }

  /**
   * @description This function is called when the user click on to the link sent to the email.
   * @function    isVerifiedService
   * @param {*}   request
   * @param {*}   callback
   */
  isVerifiedService(request, callback) {
    return new Promise(function (resolve, reject) {
      userModel
        .updateOne({ _id: request.body.data._id }, { isVerified: true })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @description This function is called to update the long url short url and urlcode fields
   *              in the user's database.
   * @function    urlShorteningServices
   * @param {*}   request
   * @param {*}   shortnerObject
   * @param {*}   callback
   */
  urlShorteningServices(request, shortnerObject) {
    return new Promise(function (resolve, reject) {
      userModel.findOne({ email: request.email }, (error, data) => {
        if (error) {
          reject(error);
        } else if (data == null) {
          reject(error);
        } else {
          userModel
            .updateOne(
              { _id: request.id },
              {
                longUrl: shortnerObject.longUrl,
                shortUrl: shortnerObject.shortUrl,
                urlCode: shortnerObject.urlCode,
              }
            )
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    });
  }

  /**
   * @description This function is called when the user forget's the password.
   * @function    forgetPassword
   * @param {*}   request
   * @param {*}   callback
   */
  forgetPassword(request, callback) {
    userModel.findOne({ email: request.email }, (error, data) => {
      if (error) {
        return callback(error);
      } else if (data == null) {
        return callback(error);
      } else {
        return callback(null, data);
      }
    });
  }

  /**
   * @description This function is called when user want to reset the password.
   * @function    resetPassswordService
   * @param {*}   request
   * @param {*}   callback
   */
  resetPassswordService(request, callback) {
    return new Promise(function (resolve, reject) {
      userModel.findOne({ _id: request.id }, (error, data) => {
        if (error) {
          reject(error);
        } else if (data === null) {
          reject(error);
        } else {
          bcrypt.encryptPassword(request.password, (error, encryptedData) => {
            if (error) {
              reject(error);
            } else {
              let encryptPassword = encryptedData;
              userModel
                .updateOne({ _id: data.id }, { password: encryptPassword })
                .then((data) => {
                  resolve(data);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          });
        }
      });
    });
  }

  imageUploadService(request) {
    return new Promise(function (resolve, reject) {
      userModel.findOne({ _id: request.id }, (error, data) => {
        if (error) {
          return reject(error);
        } else if (data === null) {
          return reject(error);
        } else {
          userModel
            .updateOne({ _id: data.id }, { imageUrl: request.imageUrl })
            .then((data) => {
              return resolve(data);
            })
            .catch((error) => {
              return reject(error);
            });
        }
      });
    });
  }

  findOne(request) {
    return new Promise((resolve, reject) => {
      userModel.findOne({ email: request.email }, (error, data) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(data);
        }
      });
    });
  }
}

module.exports = new Services();
