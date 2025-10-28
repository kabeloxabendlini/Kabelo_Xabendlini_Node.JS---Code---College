"use strict"; // Enforces stricter parsing and error handling in JavaScript

/**
 * =============================================
 *  Module Imports & App Initialization
 * =============================================
 */

// Core dependencies
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Controllers (route logic)
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController"); // Ensure this file exists
const errorController = require("./controllers/errorController");

// Models (database schemas)
const Subscriber = require("./models/subscriber");

/**
 * =============================================
 *  MongoDB Connection Setup
 * =============================================
 */

mongoose
  .connect("mongodb://127.0.0.1:27017/userForm_database")
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Handle low-level connection errors
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/**
 * =============================================
 *  Express Configuration
 * =============================================
 */

// Define the port for the server (environment variable or fallback)
app.set("port", process.env.PORT || 3000);

// Use EJS as the templating engine
app.set("view engine", "ejs");

/**
 * =============================================
 *  Middleware Setup
 * =============================================
 */

// Serve static files (CSS, images, JS) from the 'public' directory
app.use(express.static("public"));

// Enable EJS layouts for consistent page structure
app.use(layouts);

// Parse URL-encoded data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse incoming JSON data (e.g., from APIs or fetch requests)
app.use(express.json());

/**
 * =============================================
 *  Route Definitions
 * =============================================
 */

// ---------- Home Routes ----------

// Landing page
app.get("/", homeController.index);

// Courses page
app.get("/courses", homeController.showCourses);

// Handle contact form submission (POST)
app.post("/contact", homeController.postedSignUpForm);

// ---------- Subscriber Routes ----------

// Display all subscribers (async for cleaner error handling)
app.get("/subscribers", async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find();
    res.render("subscribers", { subscribers }); // Render 'subscribers.ejs' with data
  } catch (err) {
    next(err); // Forward errors to the error handler
  }
});

// Display subscription form page
app.get("/contact", subscriberController.getSubscriptionPage);

// Save a new subscriber (via form submission)
app.post("/subscribe", subscriberController.saveSubscriber);

// ---------- Users Routes ----------

// Display all users
app.get("/users", async (req, res, next) => {
  try {
    const users = await usersController.getAllUsers(); // Controller handles DB logic
    res.render("users", { users }); // Render 'users.ejs' view
  } catch (err) {
    next(err);
  }
});

/**
 * =============================================
 *  Error Handling Middleware
 * =============================================
 */

// Handle 404 (page not found)
app.use(errorController.respondNoResourceFound);

// Handle 500 (internal server error)
app.use(errorController.respondInternalError);

/**
 * =============================================
 *  Server Startup
 * =============================================
 */

// Start the Express server and log confirmation
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at: http://localhost:${app.get("port")}`);
});
