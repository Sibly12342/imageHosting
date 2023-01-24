var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var db = require("./config/connection");
var jwt = require("jsonwebtoken");
var indexRouter = require("./routes/index");
var homeRouter = require("./routes/home");
var galleryRouter = require("./routes/gallery");
var userHelpers=require('./helpers/user-helpers')

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

db.connect((err) => {
  if (err) console.log("Connection Error");
  else console.log("Db Connected Successfully");
});
app.get('/login',(req,res)=>{
  if(req.cookies?.jwt) {
    res.redirect('/home')
  } else {
    res.render('index')
  }
})

app.post("/login", (req, res) => {
  // console.log(req.body);
  userHelpers.doLogin(req.body).then(async (response) => {
    console.log(response);
    if (response.status) {
      let token = await jwt.sign({ ...req.body }, "123");
      console.log(response);
      console.log(token);
      res.cookie("jwt", token).redirect("/home");
    } else {
      console.log('1');
      res.redirect("/login");
    }
  });
});
app.post("/signup", (req, res) => {
  console.log(req.body);
  userHelpers.addUsers(req.body).then((response) => {
    res.redirect("/");
  });
});

app.use(async (req, res, next) => {
  const token = req.cookies?.jwt || null;
  console.log(token);
  if (token!=null) {
    const result = await jwt.verify(token, "123");
    if (result) {
      next();
    } else {
      console.log('2');
       res.redirect("/login");
    }
  } else {
    console.log('3');
     res.redirect("/login");
  }
});

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/home", homeRouter);
app.use("/gallery", galleryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
