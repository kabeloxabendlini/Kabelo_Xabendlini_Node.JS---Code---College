"use strict";

/**
 * ==============================
 *  Express App Configuration
 * ==============================
 */
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");

// Controllers
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const usersController = require("./controllers/userController");
const errorController = require("./controllers/errorController");

// Mongoose & Models
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

/**
 * ==============================
 *  MongoDB Connection (Mongoose)
 * ==============================
 */
mongoose
  .connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;

db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

/**
 * ==============================
 *  Express App Settings
 * ==============================
 */
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

/**
 * ==============================
 *  Middleware Setup
 * ==============================
 */
app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

/**
 * ==============================
 *  Routes
 * ==============================
 */

// Home page
app.get("/", homeController.index);

// Courses page
app.get("/courses", homeController.showCourses);

// Contact form submission (POST)
app.post("/contact", homeController.postedSignUpForm);

// Subscriber routes
app.get("/subscribers", subscriberController.getAllSubscribers, (req, res) => {
  res.render("subscribers", { subscribers: req.data });
});

app.get("/contact", subscriberController.getSubscriptionPage);
app.post("/subscribe", subscriberController.saveSubscriber);

// User routes
app.get("/users", usersController.index);

/**
 * ==============================
 *  Error Handling
 * ==============================
 */
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

/**
 * ==============================
 *  Server Start
 * ==============================
 */
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});