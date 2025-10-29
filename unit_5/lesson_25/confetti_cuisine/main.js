"use strict";

// =======================
// Module Imports
// =======================
const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");

// =======================
// App Initialization
// =======================
const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// Database Connection
// =======================
mongoose.connect("mongodb://127.0.0.1:27017/confetti_cuisine")
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// =======================
// App Configuration
// =======================
app.set("view engine", "ejs");
app.set("port", PORT);
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  resave: false,
  saveUninitialized: false
}));
app.use(connectFlash());

// =======================
// Middleware for Flash Messages
// =======================
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// =======================
// Controllers
// =======================
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const errorController = require("./controllers/errorController");

// =======================
// Global template variables
// =======================
app.use((req, res, next) => {
  res.locals.loggedIn = req.session && req.session.userId ? true : false;
  res.locals.currentUser = req.user || null;
  next();
});

// =======================
// Routes
// =======================
app.get("/", homeController.index);
app.get("/contact", homeController.contact);

app.get("/subscribers", subscribersController.index);
app.get("/subscribers/new", subscribersController.new);
app.post("/subscribers/create", subscribersController.create);

app.get("/users", usersController.index);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create);
app.get("/users/login", usersController.login);
app.post("/users/login", usersController.authenticate);

// =======================
// Error Handling
// =======================
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// =======================
// Server Start
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
