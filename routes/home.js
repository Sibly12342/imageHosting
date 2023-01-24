const express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const { ObjectId } = require("mongodb");
const userHelpers = require("../helpers/user-helpers");

/* Image Upload */

const filePath = path.join(__dirname, "../");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + new ObjectId() + ".webp");
  },
});
const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { title: "Home",login:true });
});

/* IMAGE UPLOAD */
router.post("/image-upload", upload.array("Image", 12), (req, res, next) => {
  // try {
  userHelpers.uploadImage(req.files)
  .then((response) => {
    res.redirect("/home");
  });
  // } catch (error) {
  //   res.redirect("/404");
  // }
});

module.exports = router;
