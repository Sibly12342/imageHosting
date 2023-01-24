var express = require("express");
var jwt = require("jsonwebtoken");
const userHelpers = require("../helpers/user-helpers");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "userCredentials" });
});
router.get("/index", (req, res) => {
  res.redirect("/");
});

router.get('/logout',(req,res)=>{
  console.log('logout')
  res.cookie("jwt", '').redirect("/login");
})

module.exports = router;
