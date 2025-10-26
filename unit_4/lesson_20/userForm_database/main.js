"use strict";

const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Controllers
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController"); // make sure the file exists
const errorController = require("./controllers/errorController");

// Models
const Subscriber = require("./models/subscriber");

// ==============================
// MongoDB Connection
// ==============================
mongoose
  .connect("mongodb://127.0.0.1:27017/userForm_database", {
    // removed deprecated options
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// ==============================
// Express Settings
// ==============================
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// ==============================
// Middleware
// ==============================
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ==============================
// Routes
// ==============================

// Home page
app.get("/", homeController.index);

// Courses page
app.get("/courses", homeController.showCourses);

// Contact form submission
app.post("/contact", homeController.postedSignUpForm);

// Subscribers
app.get("/subscribers", async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find();
    res.render("subscribers", { subscribers });
  } catch (err) {
    next(err);
  }
});

// Subscription form page
app.get("/contact", subscriberController.getSubscriptionPage);

// Save a new subscriber
// async function to fetch subscribers
app.get("/subscribers", async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find(); // Make sure Subscriber model is imported
    res.render("subscribers", { subscribers });
  } catch (err) {
    next(err);
  }
});

// Users page
app.get("/users", async (req, res, next) => {
  try {
    const users = await usersController.getAllUsers(); // Call the function
    res.render("users", { users });
  } catch (err) {
    next(err);
  }
});

// ==============================
// Error Handling
// ==============================
app.use(errorController.respondNoResourceFound); // 404
app.use(errorController.respondInternalError);   // 500

// ==============================
// Start Server
// ==============================
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});