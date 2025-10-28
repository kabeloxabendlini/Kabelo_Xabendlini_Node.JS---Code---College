"use strict"; // Enforce strict mode for safer and cleaner JavaScript execution

/**
 * ==============================
 *  Module Imports & App Setup
 * ==============================
 */

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"), // Handles errors (404, 500, etc.)
  homeController = require("./controllers/homeController"), // Handles homepage and general site routes
  subscribersController = require("./controllers/subscribersController"), // Handles subscriber logic
  usersController = require("./controllers/usersController"), // Handles user-related logic
  coursesController = require("./controllers/coursesController"), // Handles course-related routes
  Subscriber = require("./models/subscriber"); // Subscriber model (Mongoose schema for database entries)

// Tell Mongoose to use native JavaScript promises instead of deprecated ones
mongoose.Promise = global.Promise;

/**
 * ==============================
 *  MongoDB Connection (Mongoose)
 * ==============================
 */

// Connect to MongoDB database (named "recipe_db")
mongoose.connect("mongodb://localhost:27017/recipe_db")
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

const db = mongoose.connection;

// Log once the connection is fully established
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

/**
 * ==============================
 *  Express App Configuration
 * ==============================
 */

// Define port (use environment variable if available, else default to 3000)
app.set("port", process.env.PORT || 3000);

// Set EJS as the view engine for rendering dynamic pages
app.set("view engine", "ejs");

/**
 * ==============================
 *  Middleware Setup
 * ==============================
 */

// Serve static files (CSS, JS, images) from the "public" directory
app.use(express.static("public"));

// Enable express-ejs-layouts for consistent layout templates
app.use(layouts);

// Parse incoming form data (URL-encoded payloads)
app.use(
  express.urlencoded({
    extended: false // Use the classic query string library
  })
);

// Parse incoming JSON data (for API or AJAX requests)
app.use(express.json());

// Custom middleware — logs all incoming request paths
app.use(homeController.logRequestPaths);

/**
 * ==============================
 *  Route Definitions
 * ==============================
 */

// ---------- Home Routes ----------
app.get("/", homeController.index); // Render homepage (index.ejs)
app.get("/contact", homeController.getSubscriptionPage); // Render contact/subscription form

// ---------- Users Routes ----------
// Display all users → calls two controller methods: index (fetch data) and indexView (render view)
app.get("/users", usersController.index, usersController.indexView);

// ---------- Subscribers Routes ----------
// Display all subscribers → calls index (fetch) then indexView (render)
app.get("/subscribers", subscribersController.index, subscribersController.indexView);

// ---------- Courses Routes ----------
// Display all available courses
app.get("/courses", coursesController.index, coursesController.indexView);

// ---------- Form Submissions ----------
// Handle new subscriber form submission (from contact page)
app.post("/subscribe", subscribersController.saveSubscriber);

/**
 * ==============================
 *  Error Handling Middleware
 * ==============================
 */

// Log all errors to the console (for debugging)
app.use(errorController.logErrors);

// Handle 404 errors (resource not found)
app.use(errorController.respondNoResourceFound);

// Handle 500 errors (internal server problems)
app.use(errorController.respondInternalError);

/**
 * ==============================
 *  Start Server
 * ==============================
 */

// Start the Express server on the defined port
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at: http://localhost:${app.get("port")}`);
});
