/**
 * @description This file specific the controller function for the routes
 * @file        routes.routes.js
 * @overview    According to the http methods the routes/express-router specific
 *              the controller function or the next destination for the specified
 *              route.
 * @author      Sindooja Gajam
 * @version     node v12.10.0
 * @since       17 December 2019
 */

/**
 * @const      routes Routes constant having the `express.Router` module
 */
var userController = require("../controller/user");
var express = require("express");
const routes = express.Router();
var jwt = require("../auth/jwtToken");
var user = require("../app/model/user");
var upload = require("../services/s3");
var singleUpload = upload.single("image");
var logger = require("../config/winston");
var noteController = require("../controller/note");
var labelController = require("../controller/label");

routes.post("/register", userController.createController);

routes.post("/login", userController.loginController);

routes.post("/forgotpassword", userController.forgetPasswordController);

routes.post(
  "/resetpassword",
  jwt.verifyToken,
  userController.resetPasswordController
);

routes.get("/verify/:url", (request, response) => {
  user.findOne({ urlCode: request.params.url }, (error, data) => {
    if (error) {
      return response.status(404).send("Url not found");
    } else {
      response.redirect(data.longUrl);
    }
  });
});

routes.post(
  "/verifyuser",
  jwt.verifyToken,
  userController.isVerifiedController
);

routes.post("/imageupload", jwt.verifyToken, function (request, response) {
  var imageSaveObject = {};
  imageSaveObject.id = request.body.data._id;

  singleUpload(request, response, function (error) {
    var res = {};
    if (error) {
      res.message = error;
      res.success = false;
      return response.status(500).send(res);
    } else {

      imageSaveObject.imageUrl = request.file.location;
      userController
        .uploadImageController(imageSaveObject)
        .then((data) => {
          res.message = "Successfully saved";
          res.success = true;
          res.data = data.imageUrl;
          return response.status(200).send(res);
        })
        .catch((error) => {
          res.error = error;
          res.success = false;
          return response.status(500).send(res);
        });
    }
  });
});

//Route for search
routes.post("/search", jwt.verifyToken, noteController.search);

//Routes for note
routes.post("/note", jwt.verifyToken, noteController.createNote);

routes.get("/note", jwt.verifyToken, noteController.getAllNotes);

routes.put("/note/:noteId", jwt.verifyToken, noteController.editNote);

routes.delete("/note/:noteId", jwt.verifyToken, noteController.deleteNote);

routes.post("/remainder/:noteId", jwt.verifyToken, noteController.addRemainder);

routes.put(
  "/remainder/:noteId",
  jwt.verifyToken,
  noteController.deleteReminder
);

routes.put("/addlabel/:noteId", jwt.verifyToken, noteController.addLabelToNote);

routes.put(
  "/removelabel/:noteId",
  jwt.verifyToken,
  noteController.deleteLabelFromNote
);

routes.put(
  "/addcollaborator/:noteId",
  jwt.verifyToken,
  noteController.addCollaborator
);

routes.put(
  "/removecollaborator/:noteId",
  jwt.verifyToken,
  noteController.removeCollaborator
);

routes.put("/notesequencing", jwt.verifyToken, noteController.noteSequencing);

//Routes for label
routes.post("/label", jwt.verifyToken, labelController.createLabel);

routes.get("/label", jwt.verifyToken, labelController.getAllLabels);

routes.put("/label/:labelId", jwt.verifyToken, labelController.editLabel);

routes.delete("/label/:labelId", jwt.verifyToken, labelController.deleteLabel);

module.exports = routes;