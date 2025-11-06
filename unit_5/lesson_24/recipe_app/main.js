"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");

// Controllers
const homeController = require("./controllers/homeController");
const usersController = require("./controllers/usersController");
const subscribersController = require("./controllers/subscribersController");
const coursesController = require("./controllers/coursesController");
const errorController = require("./controllers/errorController");

// Models
const User = require("./models/user");

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/recipe_db")
  .then(() => console.log("✅ Successfully connected to MongoDB!"))
  .catch(err => console.error(err));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middleware
router.use(express.static("public"));
router.use(layouts);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// Session & flash
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
  secret: "secret_passcode",
  cookie: { maxAge: 4000000 },
  resave: false,
  saveUninitialized: false
}));
router.use(connectFlash());

// Passport setup
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set locals for templates
router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// Request logging
router.use(homeController.logRequestPaths);

// Routes
router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

// Users
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

// Subscribers
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.post("/subscribe", subscribersController.saveSubscriber);

// Courses
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);

// Errors
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

// Mount router
app.use("/", router);

// Start server
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
