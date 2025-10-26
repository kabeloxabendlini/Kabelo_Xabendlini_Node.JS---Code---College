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
console.log("HomeController:", homeController);
const homeController = require("./controllers/homeController");

console.log("subscriberController:", subscriberController);
const subscriberController = require("./controllers/subscribersController");

console.log("ErrorController:", errorController);
const errorController = require("./controllers/errorController");

// Mongoose & Models
const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");

const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
/**
 * ==============================
 *  MongoDB Connection (Mongoose)
 * ==============================
 */
mongoose
  .connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // improves connection stability
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

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
app.set("port", process.env.PORT || 3000); // Dynamic port for deployment
app.set("view engine", "ejs"); // Set EJS as the templating engine

/**
 * ==============================
 *  Middleware Setup
 * ==============================
 */
app.use(express.static("public")); // Serve static files (CSS, images, JS)
app.use(layouts); // Enable EJS layouts
app.use(
  express.urlencoded({
    extended: false, // Use classic querystring library
  })
);
app.use(express.json()); // Parse JSON payloads

/**
 * ==============================
 *  Route Definitions
 * ==============================
 */

console.log("SubscriberController object:", subscriberController);
console.log("getAllSubscribers type:", typeof subscriberController.getAllSubscribers);

// Home page
console.log("Loading home route");
app.get("/", homeController.index); // → renders index.ejs

// Courses page
console.log("Loading courses route");
app.get("/courses", homeController.showCourses); // → renders courses.ejs

// Contact form submission (POST)
console.log("Loading contact post route");
app.post("/contact", homeController.postedSignUpForm);

// Subscriber routes
console.log("Loading /subscribers route...");
console.log("getAllSubscribers:", subscriberController.getAllSubscribers);
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res) => {
    res.render("subscribers", { subscribers: req.data });
  }
);

// Subscription form page
console.log("Loading /contact route...");
app.get("/contact", subscriberController.getSubscriptionPage);


// Save a new subscriber (form submission)
console.log("Loading /subscribe route...");
app.post("/subscribe", subscriberController.saveSubscriber);

/**
 * ==============================
 *  Error Handling Middleware
 * ==============================
 */
app.use(errorController.respondNoResourceFound); // 404 handler
app.use(errorController.respondInternalError); // 500 handler

/**
 * ==============================
 *  Start Server
 * ==============================
 */
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at: http://localhost:${app.get("port")}`);
});
