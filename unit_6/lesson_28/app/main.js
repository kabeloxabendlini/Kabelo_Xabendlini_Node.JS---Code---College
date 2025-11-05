"use strict";

const express = require("express");
const app = express();

//------------------------------------------------------
const router = require("./routes/index");
//------------------------------------------------------

const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");
const homeController = require("./controllers/homeController");
const User = require("./models/user");

// ✅ Mongoose setup
mongoose
  .connect("mongodb://127.0.0.1:27017/recipe_db", {
    // Only keep current valid options
  })
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(express.json());
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

// ✅ Set locals for all views
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// ⚠️ express-validator v7+ has changed
// If you’re using latest version, comment this out or install legacy version
// npm install express-validator@5
// app.use(expressValidator()); ❌ remove this line for now

app.use(homeController.logRequestPaths);

//------------------------------------------------------
app.use("/", router);
//------------------------------------------------------

app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
