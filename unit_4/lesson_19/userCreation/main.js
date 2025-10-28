"use strict"; // Enforce strict mode for cleaner, safer JavaScript execution

/**
 * ==============================
 *  Express App Configuration
 * ==============================
 */

// Import Express framework and supporting libraries
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");

// Import controllers (separate files that handle route logic)
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const errorController = require("./controllers/errorController");

// Import Mongoose (for MongoDB connection and schema modeling)
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber"); // Mongoose model for subscribers

/**
 * ==============================
 *  MongoDB Connection (Mongoose)
 * ==============================
 */

// Connect to MongoDB database named "confetti_cuisine"
mongoose
  .connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Improves stability of database connections
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;

// Once the connection is open, confirm success
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

/**
 * ==============================
 *  Express App Settings
 * ==============================
 */

// Define port (from environment variable or default 3000)
app.set("port", process.env.PORT || 3000);

// Set the view engine to EJS for server-side rendering of HTML templates
app.set("view engine", "ejs");

/**
 * ==============================
 *  Middleware Setup
 * ==============================
 */

// Serve static assets (CSS, JS, images) from the "public" directory
app.use(express.static("public"));

// Enable use of layout templates (layout.ejs wraps each rendered view)
app.use(layouts);

// Parse URL-encoded form data (used in HTML form submissions)
app.use(
  express.urlencoded({
    extended: false, // Use classic query string parser
  })
);

// Parse JSON data in incoming requests (useful for APIs or AJAX)
app.use(express.json());

/**
 * ==============================
 *  Route Definitions
 * ==============================
 */

// ---------- Home Routes ----------

// Render the homepage (index.ejs)
app.get("/", homeController.index);

// Render the courses page (courses.ejs)
app.get("/courses", homeController.showCourses);

// Handle contact form submission (POST request from a form)
app.post("/contact", homeController.postedSignUpForm);

// ---------- Subscriber Routes ----------

// Display all subscribers and render the "subscribers.ejs" view
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers, // Fetch subscribers from DB
  (req, res) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

// Render the subscription/contact form
app.get("/contact", subscriberController.getSubscriptionPage);

// Handle form submission to save a new subscriber in MongoDB
app.post("/subscribe", subscriberController.saveSubscriber);

// ---------- User Routes ----------

// Render a list of users (usersController handles DB fetch and rendering)
app.get("/users", usersController.index);

/**
 * ==============================
 *  Error Handling Middleware
 * ==============================
 */

// Handle 404 (page not found) errors
app.use(errorController.respondNoResourceFound);

// Handle 500 (server/internal) errors
app.use(errorController.respondInternalError);

/**
 * ==============================
 *  Start Server
 * ==============================
 */

// Start the Express server and log the running URL
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at: http://localhost:${app.get("port")}`);
});
