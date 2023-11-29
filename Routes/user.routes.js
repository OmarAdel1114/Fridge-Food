const express = require("express");
const userController = require("../Controllers/user.controller");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const multer = require("multer");
const appError = require("../utils/appError");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  const imageType = file.mimetype.split("/")[0];

  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(appError.creat("It must be an Image", 400), false);
  }
};

const uploads = multer({
  storage: diskStorage,
  fileFilter,
});

router.route("/").get(verifyToken, userController.getAllUsers);

router
  .route("/register")
  .post(uploads.single("avatar"), userController.register);

router.route("/login").post(userController.login);

module.exports = router;
