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

// Home page
app.get("/", homeController.index); // → renders index.ejs

// Courses page
app.get("/courses", homeController.showCourses); // → renders courses.ejs

// Contact form submission (POST)
app.post("/contact", homeController.postedSignUpForm);

// Subscriber routes
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res) => {
    res.render("subscribers", { subscribers: req.data }); // → renders subscribers.ejs
  }
);

// Subscription form page
app.get("/contact", subscriberController.getSubscriptionPage);

// Save a new subscriber (form submission)
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
