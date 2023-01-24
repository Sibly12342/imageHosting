var express = require("express");
const userHelpers = require("../helpers/user-helpers");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  /* RETRIEVE IMAGES */
  let images = await userHelpers.retrieveImage();
  res.render("gallery", { title: "Gallery",images,login:true});
});

module.exports = router;
