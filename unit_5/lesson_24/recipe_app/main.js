"use strict";

// =======================
// Module Imports
// =======================
const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");

// Controllers
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");

// =======================
// MongoDB Connection
// =======================
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ Successfully connected to MongoDB!"));
db.on("error", (err) => console.error(`❌ MongoDB connection error: ${err}`));

// =======================
// Express App Settings
// =======================
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// =======================
// Middleware
// =======================
router.use(express.static("public"));
router.use(layouts);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(methodOverride("_method", { methods: ["POST", "GET"] }));
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());

// Make flash messages available in views
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// Log request paths (homeController middleware)
router.use(homeController.logRequestPaths);

// =======================
// Routes
// =======================

// HOME
router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

// USERS
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);

// SUBSCRIBERS
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.post("/subscribe", subscribersController.saveSubscriber);

// COURSES
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);

// =======================
// Error Handling
// =======================
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

// =======================
// Start App
// =======================
app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
