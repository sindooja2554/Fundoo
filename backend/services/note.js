/**
 * @description This file contains service class.
 * @file        services.note.js
 * @overview    The service class gives call to API class according to the request.
 * @author      Sindooja Gajam
 * @version     node v12.10.0
 * @since       16 January 2020
 */
var noteModel = require("../app/model/note");
var logger = require("../config/winston");
var labelModel = require("../app/model/label");
var redisCache = require("./redis");
var userService = require("./user");
class Service {
  /**
   * @description This function is called to find the user and set the notes of the users in  the redis
   *              cache
   * @param {*} request
   */
  getAllNotes(request) {
    return new Promise(function (resolve, reject) {
      noteModel
        .read({ userId: request.userId })
        .then((data) => {
          if (data !== null) {
            redisCache.set(
              "getAllNotes" + request.userId,
              JSON.stringify(data),
              (reply) => {
                if (reply) {
                  return resolve(data);
                }
              }
            );
          } else {
            return resolve("no note found");
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to delete note by calling the delete API
   * @param {*} request
   */
  deleteNote(request) {
    let get = this;
    return new Promise(function (resolve, reject) {
      noteModel
        .delete({ _id: request.noteId, userId: request.userId })
        .then((data) => {
          if (data === null) {
            return resolve(data);
          } else if (data !== null) {
            let getNotesObject = {
              userId: request.userId,
            };

            get.getAllNotes(getNotesObject).then(() => {
              return resolve(data);
            }).catch((error) => {
              return reject(error);
            });
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to create note by calling the create API
   * @param {*} request
   */
  createNote(request) {
    let get = this;
    return new Promise(function (resolve, reject) {
      noteModel
        .create(request)
        .then((data) => {
          if (data !== null) {
            let getNotesObject = {
              userId: request.userId,
            };

            get.getAllNotes(getNotesObject).then(() => {
              return resolve(data);
            }).catch((error) => {
              return reject(error);
            });
          } else {
            return reject(data);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to edit note by calling the update API
   * @param {*} request This request object contains id's
   * @param {*} request This request object conatains the data to be updated
   */
  editNote(idObject, editObject) {
    return new Promise((resolve, reject) => {
      noteModel
        .read({ _id: idObject.noteId })
        .then((data) => {
          if (data !== null) {
            let note = {
              title: editObject.title ? editObject.title : data.title,
              description: editObject.description
                ? editObject.description
                : data.description,
              color: {
                name: editObject.color.name
                  ? editObject.color.name
                  : data.color.name,
                code: editObject.color.code
                  ? editObject.color.code
                  : data.color.code,
              },
              isArchive: editObject.isArchive === true ? true : false,
              isPinned: editObject.isPinned === true ? true : false,
              isTrash: editObject.isTrash === true ? true : false,
            };


            noteModel
              .update({ _id: idObject.noteId }, note)
              .then((data) => {
                if (data !== null) {
                  let getNotesObject = {
                    userId: idObject.userId,
                  };
                  this.getAllNotes(getNotesObject).then(() => {
                    return resolve(data);
                  }).catch((error) => {
                    return reject(error);
                  });
                } else {
                  return resolve(data);
                }
              })
              .catch((error) => {
                return reject(error);
              });
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to add reminder to note by calling the update API
   * @param {*} request
   */
  addRemainder(request) {
    return new Promise((resolve, reject) => {
      noteModel
        .update({ _id: request.noteId }, { remainder: request.remainder })
        .then((data) => {
          if (data !== null) {
            let getNotesObject = {
              userId: request.userId,
            };
            this.getAllNotes(getNotesObject).then(() => {
              return resolve(data);
            }).catch((error) => {
              return reject(error);
            });
          } else if (data == null) {
            return resolve(data);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to delete reminder from note by calling the update API
   * @param {*} request
   */
  removeReminder(request) {
    return new Promise((resolve, reject) => {
      noteModel
        .update({ _id: request.noteId }, { remainder: request.remainder })
        .then((data) => {
          if (data !== null) {
            let getNotesObject = {
              userId: request.userId,
            };
            this.getAllNotes(getNotesObject).then(() => {
              return resolve(data);
            }).catch((error) => {
              return reject(error);
            });
          } else if (data == null) {
            return resolve(data);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to search note by calling the read API
   * @param {*} request
   */
  search(request) {
    return new Promise((resolve, reject) => {
      noteModel
        .read({
          $and: [
            { $or: [{ userId: request.userId }] },
            {
              $or: [
                { title: { $regex: request.value } },
                { description: { $regex: request.value } },
                { "color.name": { $regex: request.value } },
                { remainder: { $regex: request.value } },
              ],
            },
          ],
        })
        .then((data) => {
          if (data !== null) {
            return resolve(data);
          } else if (data == null) {
            return resolve(data);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to add label to note by calling the update API
   * @param {*} request
   */
  addLabelToNote(request) {
    return new Promise((resolve, reject) => {
      if (request.labelId === null) {
        labelModel
          .create(request)
          .then((data) => {
            noteModel
              .update({ _id: request.noteId }, { $push: { labels: data._id } })
              .then((data) => {
                let getNotesObject = {
                  userId: request.userId,
                };
                this.getAllNotes(getNotesObject).then(() => {
                  return resolve(data);
                }).catch((error) => {
                  return reject(error);
                });
              })
              .catch((error) => {
                return reject(error);
              });
          })
          .catch((error) => {
            return reject(error);
          });
      } else {
        noteModel
          .update(
            { _id: request.noteId },
            { $push: { labels: request.labelId } }
          )
          .then((data) => {
            let getNotesObject = {
              userId: request.userId,
            };
            this.getAllNotes(getNotesObject).then(() => {
              return resolve(data);
            }).catch((error) => {
              return reject(error);
            });
          })
          .catch((error) => {
            return reject(error);
          });
      }
    });
  }

  /**
   * @description This function is called to delete label from note by calling the update API
   * @param {*} request This request object contains the id
   * @param {*} request This request object contains the data to updated
   */
  deleteLabelFromNote(request, editObject) {
    return new Promise((resolve, reject) => {
      noteModel
        .read(request)
        .then((data) => {
          if (data[0].labels.length !== 0) {
            for (let i = 0; i < data[0].labels.length; i++) {
              if (
                JSON.stringify(data[0].labels[i]._id) ===
                JSON.stringify(editObject.labelId)
              ) {
                data[0].labels.splice(i, 1);
                noteModel
                  .update(
                    { _id: editObject.noteId },
                    { labels: data[0].labels }
                  )
                  .then((data) => {
                    if (data !== null) {
                      let getNotesObject = {
                        userId: editObject.userId,
                      };
                      this.getAllNotes(getNotesObject).then(() => {
                        return resolve(data);
                      }).catch((error) => {
                        return reject(error);
                      });
                    } else {
                      return reject(data);
                    }
                  })
                  .catch((error) => {
                    return reject(error);
                  });
              }
            }
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * @description This function is called to delete label from note and label from label database
   *               by calling the update API
   * @param {*} request This request object contains the id
   * @param {*} request This request object contains the data to updated
   */
  deleteLabel(request, editObject) {
    return new Promise((resolve, reject) => {
      noteModel
        .read(request)
        .then((data) => {
          if (data.length === 0 || data === null) {
            return resolve(data);
          } else {
            var labelsId = [];
            for (let i = 0; i < data[0].labels.length; i++) {
              labelsId[i] = data[0].labels[i]._id;
            }
            noteModel
              .update({ _id: data[0]._id }, { labels: labelsId })
              .then((data) => {
                if (data !== null) {
                  let getNotesObject = {
                    userId: request.userId,
                  };
                  this.getAllNotes(getNotesObject).then(() => {
                    return resolve(data);
                  }).catch((error) => {
                    return reject(error);
                  });
                } else {
                  return reject(data);
                }
              })
              .catch((error) => {
                return reject(error);
              });
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  addCollaborator(request) {
    return new Promise((resolve, reject) => {
      userService
        .findOne(request)
        .then((data) => {
          noteModel
            .update(
              { _id: request.noteId },
              { $push: { collaborator: data._id } }
            )
            .then((data) => {
              let getNotesObject = {
                userId: request.userId,
              };
              this.getAllNotes(getNotesObject).then(() => {
                return resolve(data);
              }).catch((error) => {
                return reject(error);
              });
            })
            .catch((error) => {
              return reject(error);
            });
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  removeCollaborator(request) {
    return new Promise((resolve, reject) => {
      noteModel
        .read({ _id: request.noteId })
        .then((data) => {
          if (data.length !== 0 || data !== null) {
            if (data[0].collaborator.length !== 0) {
              for (let i = 0; i < data[0].collaborator.length; i++) {
                if (
                  JSON.stringify(data[0].collaborator[i]._id) ===
                  JSON.stringify(request.collaboratorId)
                ) {
                  data[0].collaborator.splice(i, 1);
                  noteModel
                    .update(
                      { _id: request.noteId },
                      { collaborator: data[0].collaborator }
                    )
                    .then((data) => {
                      if (data !== null) {
                        let getNotesObject = {
                          userId: request.userId,
                        };
                        this.getAllNotes(getNotesObject).then(() => {
                          return resolve(data);
                        }).catch((error) => {
                          return reject(error);
                        });
                      } else {
                        return reject(data);
                      }
                    })
                    .catch((error) => {
                      return reject(error);
                    });
                }
              }
            }
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

module.exports = new Service();
