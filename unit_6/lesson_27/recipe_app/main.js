"use strict";

// =======================
// Module Imports
// =======================
const express = require("express");
const app = express();
const router = require("./routes/index");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");

const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const User = require("./models/user");

// =======================
// Database Setup (Mongoose 7+)
// =======================
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false); // optional to suppress deprecation warnings

mongoose.connect("mongodb://127.0.0.1:27017/recipe_db")
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// =======================
// App Configuration
// =======================
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(cookieParser("secret_passcode"));

app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false
  })
);

// =======================
// Passport Authentication
// =======================
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

// =======================
// Global Middleware
// =======================
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// =======================
// Routes
// =======================
app.use("/", router);

// =======================
// Error Handling Middleware
// =======================
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// =======================
// Start Server
// =======================
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
