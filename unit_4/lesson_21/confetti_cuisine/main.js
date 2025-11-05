"use strict"; // Enforces stricter parsing and better error handling in JavaScript

/**
 * ==========================================
 *  Module Imports & App Setup
 * ==========================================
 */

const express = require("express"); // Web framework for building the server
const app = express(); // Initialize the Express application
const errorController = require("./controllers/errorController"); // Error-handling logic
const homeController = require("./controllers/homeController"); // Handles home-related routes
const layouts = require("express-ejs-layouts"); // EJS layout middleware for templating
const mongoose = require("mongoose"); // MongoDB object modeling tool
const Subscriber = require("./models/subscriber"); // Mongoose model for subscribers
const subscriberController = require("./controllers/subscribersController"); // Controller for subscriber operations

/**
 * ==========================================
 *  MongoDB Connection (Mongoose)
 * ==========================================
 */

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/capstone_database")
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch(err => console.error("❌ Connection error:", err));

// Store the database connection
const db = mongoose.connection;

// Once the connection opens successfully, log a message
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

/**
 * ==========================================
 *  Express App Configuration
 * ==========================================
 */

// Set the server port (defaults to 3000 if not defined)
app.set("port", process.env.PORT || 3000);

// Use EJS as the templating engine for rendering views
app.set("view engine", "ejs");

/**
 * ==========================================
 *  Middleware Setup
 * ==========================================
 */

// Serve static files like CSS, JS, and images from the "public" folder
app.use(express.static("public"));

// Enable EJS layouts for consistent headers/footers across pages
app.use(layouts);

// Parse URL-encoded data (from HTML form submissions)
app.use(
  express.urlencoded({
    extended: false, // Use the classic query string parser
  })
);

// Parse incoming JSON payloads (for APIs or AJAX requests)
app.use(express.json());

/**
 * ==========================================
 *  Route Definitions
 * ==========================================
 */

// ---------- Home Routes ----------

// Root route (GET /) → renders index.ejs
app.get("/", homeController.index);

// Courses page route (GET /courses) → renders courses.ejs
app.get("/courses", homeController.showCourses);

// Contact form submission handler (POST /contact)
app.post("/contact", homeController.postedSignUpForm);

// ---------- Subscriber Routes ----------

// Display all subscribers (GET /subscribers)
// `subscriberController.getAllSubscribers` fetches the data,
// then the final function renders subscribers.ejs with that data
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data }); // Render page with subscriber data
  }
);

// Display subscription form page (GET /contact)
app.get("/contact", subscriberController.getSubscriptionPage);

// Handle new subscriber submission (POST /subscribe)
app.post("/subscribe", subscriberController.saveSubscriber);

/**
 * ==========================================
 *  Error Handling Middleware
 * ==========================================
 */

// Handle 404 errors (page/resource not found)
app.use(errorController.respondNoResourceFound);

// Handle 500 errors (internal server issues)
app.use(errorController.respondInternalError);

/**
 * ==========================================
 *  Start the Server
 * ==========================================
 */

// Start the server and log the running port
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
