"use strict"; // Enforces strict mode for cleaner, safer JavaScript

// =======================
// Module Imports
// =======================
const express = require("express"); // Import Express framework
const app = express(); // Create an Express application instance
const errorController = require("./controllers/errorController"); // Custom error-handling middleware
const homeController = require("./controllers/homeController"); // Controller for home-related routes
const layouts = require("express-ejs-layouts"); // Middleware for EJS layouts
const mongoose = require("mongoose"); // MongoDB ODM library
const Subscriber = require("./models/subscriber"); // Subscriber model for MongoDB
const subscriberController = require("./controllers/subscribersController"); // Controller for subscriber-related logic

// =======================
// Database Connection
// =======================
mongoose.connect("mongodb://0.0.0.0:27017/recipe_app")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));


const db = mongoose.connection;

// Event listener for successful database connection
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

// =======================
// Example Query
// =======================
// Finds all subscriber documents matching the name "Leotha Gradwell"
const query = Subscriber.find({ name: "Leotha Gradwell" }).exec();

query
  .then(docs => {
    console.log(docs); // Logs any matching documents
  })
  .catch(err => {
    console.error(err); // Logs errors if the query fails
  });

// =======================
// Express App Configuration
// =======================
app.set("port", process.env.PORT || 3000); // Set default port to 3000 or use environment variable
app.set("view engine", "ejs"); // Set EJS as the view engine for rendering templates

// =======================
// Middleware
// =======================
app.use(express.static("public")); // Serve static files (CSS, images, JS) from "public" folder
app.use(layouts); // Use express-ejs-layouts for consistent layout structure across pages

// Parse incoming form data (URL-encoded) and JSON
app.use(
  express.urlencoded({
    extended: false, // Only parse simple form data
  })
);
app.use(express.json());

// Custom middleware to log incoming request paths
app.use(homeController.logRequestPaths);

// =======================
// Routes
// =======================

// Home page route (renders "index.ejs")
app.get("/", homeController.index);

// Courses page route (renders "courses.ejs")
app.get("/courses", homeController.showCourses);

// Subscribers page route (renders "subscribers.ejs")
// Uses controller to fetch all subscribers before rendering
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

// Subscription form page (renders "contact.ejs")
app.get("/contact", subscriberController.getSubscriptionPage);

// Form submission route for saving a new subscriber
app.post("/subscribe", subscriberController.saveSubscriber);

// =======================
// Error Handling Middleware
// =======================

// Logs any errors that occur during request processing
app.use(errorController.logErrors);

// Handles 404 errors (resource not found)
app.use(errorController.respondNoResourceFound);

// Handles 500 errors (internal server errors)
app.use(errorController.respondInternalError);

// =======================
// Server Startup
// =======================
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
