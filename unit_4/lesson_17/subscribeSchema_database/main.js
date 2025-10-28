"use strict"; // Enforce strict mode for cleaner, safer JavaScript execution

/**
 * ==============================
 *  Express App Configuration
 * ==============================
 */

const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");

// =======================
// Controllers
// =======================

// Import controllers that handle routing and logic for different app areas
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");

// Debugging logs to verify controller imports
console.log("HomeController:", homeController);
console.log("subscriberController:", subscriberController);
console.log("ErrorController:", errorController);

/**
 * ==============================
 *  Mongoose & Models
 * ==============================
 */

const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber"); // Subscriber model (already defined elsewhere)

// Example schema definition (note: redundant if using imported model)
const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number,
});

// Export model if this file defines it directly
module.exports = mongoose.model("Subscriber", subscriberSchema);

/**
 * ==============================
 *  MongoDB Connection (Mongoose)
 * ==============================
 */

// Connect to the local MongoDB database using Mongoose
mongoose
  .connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Improves connection stability and reduces deprecation warnings
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err)); // Catch any connection errors

const db = mongoose.connection;

// Log connection success
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

/**
 * ==============================
 *  Express App Settings
 * ==============================
 */

app.set("port", process.env.PORT || 3000); // Dynamic port for deployment environments
app.set("view engine", "ejs"); // Set EJS as the templating engine for rendering views

/**
 * ==============================
 *  Middleware Setup
 * ==============================
 */

// Serve static assets (CSS, JS, images) from the "public" directory
app.use(express.static("public"));

// Enable layout support for EJS (uses layout.ejs as a wrapper)
app.use(layouts);

// Parse URL-encoded form data (for HTML form submissions)
app.use(
  express.urlencoded({
    extended: false, // Use classic querystring library
  })
);

// Parse incoming JSON payloads (for API requests)
app.use(express.json());

/**
 * ==============================
 *  Route Definitions
 * ==============================
 */

// Debugging logs to confirm controller methods
console.log("SubscriberController object:", subscriberController);
console.log("getAllSubscribers type:", typeof subscriberController.getAllSubscribers);

// =======================
// Home Routes
// =======================

// Render the home page (index.ejs)
console.log("Loading home route");
app.get("/", homeController.index);

// Render the courses page (courses.ejs)
console.log("Loading courses route");
app.get("/courses", homeController.showCourses);

// Handle POST submission from the contact form (not the subscription form)
console.log("Loading contact post route");
app.post("/contact", homeController.postedSignUpForm);

// =======================
// Subscriber Routes
// =======================

// List all subscribers and render "subscribers.ejs"
console.log("Loading /subscribers route...");
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers, // Middleware to fetch subscriber data
  (req, res) => {
    res.render("subscribers", { subscribers: req.data }); // Pass data to the view
  }
);

// Render the subscription form (contact.ejs)
console.log("Loading /contact route...");
app.get("/contact", subscriberController.getSubscriptionPage);

// Handle form submission to save a new subscriber
console.log("Loading /subscribe route...");
app.post("/subscribe", subscriberController.saveSubscriber);

/**
 * ==============================
 *  Error Handling Middleware
 * ==============================
 */

// Handle 404 (resource not found) errors
app.use(errorController.respondNoResourceFound);

// Handle 500 (internal server) errors
app.use(errorController.respondInternalError);

/**
 * ==============================
 *  Start Server
 * ==============================
 */

// Start the Express server on the configured port
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at: http://localhost:${app.get("port")}`);
});
