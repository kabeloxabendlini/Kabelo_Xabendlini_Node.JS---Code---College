"use strict";

const express = require("express");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");

// Controllers
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

// Routers
const router = require("./routes/index");

// Models
const User = require("./models/user");

const app = express();

// ----------------------
// Database Connection
// ----------------------
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ Successfully connected to MongoDB!"));
db.on("error", err => console.error("MongoDB connection error:", err));

// ----------------------
// App Settings
// ----------------------
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// ----------------------
// Middleware
// ----------------------
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(cookieParser("secretCuisine123"));
app.use(
  expressSession({
    secret: "secretCuisine123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 4000000 }
  })
);

app.use(connectFlash());

// ----------------------
// Passport Setup
// ----------------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ----------------------
// Flash & Current User
// ----------------------
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// ----------------------
// Routes
// ----------------------
app.use("/", router);

// ----------------------
// Error Handling
// ----------------------
app.use(errorController.logErrors);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// ----------------------
// Server
// ----------------------
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
