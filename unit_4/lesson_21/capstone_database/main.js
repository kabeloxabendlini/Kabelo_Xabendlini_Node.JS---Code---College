"use strict"; // Enforce strict mode for cleaner, safer JavaScript execution

/**
 * ==============================
 *  Express App Configuration
 * ==============================
 */

// Import core dependencies
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");

// Import controllers to handle specific logic for each route group
const homeController = require("./controllers/homeController");
const subscriberController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController"); // ✅ Ensure correct filename
const errorController = require("./controllers/errorController");

// Import Mongoose (ODM) and models
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

/**
 * ==============================
 *  MongoDB Connection (Mongoose)
 * ==============================
 */

// Connect to the MongoDB database (local instance)
mongoose
  .connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
    useNewUrlParser: true,    // Parse MongoDB connection strings correctly
    useUnifiedTopology: true, // Improve connection management & stability
  })
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/**
 * ==============================
 *  Express App Settings
 * ==============================
 */

// Define the port (environment variable preferred for deployment)
app.set("port", process.env.PORT || 3000);

// Use EJS as the view (templating) engine for dynamic HTML rendering
app.set("view engine", "ejs");

/**
 * ==============================
 *  Middleware Setup
 * ==============================
 */

// Serve static assets like CSS, JS, and images from the "public" directory
app.use(express.static("public"));

// Enable EJS layouts to keep consistent header/footer structures
app.use(layouts);

// Parse incoming form data (URL-encoded bodies)
app.use(
  express.urlencoded({
    extended: false, // Use simple querystring library (sufficient for most apps)
  })
);

// Parse JSON data (for APIs or AJAX requests)
app.use(express.json());

/**
 * ==============================
 *  Routes
 * ==============================
 */

// ---------- Home Routes ----------

// Homepage (GET /)
app.get("/", homeController.index); // Renders index.ejs

// Courses page (GET /courses)
app.get("/courses", homeController.showCourses); // Renders courses.ejs

// Contact form submission (POST /contact)
app.post("/contact", homeController.postedSignUpForm); // Handles form submission logic

// ---------- Subscriber Routes ----------

// Display all subscribers (GET /subscribers)
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers, // Middleware fetches subscriber data
  (req, res) => {
    // Render page after data is fetched
    res.render("subscribers", { subscribers: req.data });
  }
);

// Display subscription form (GET /contact)
app.get("/contact", subscriberController.getSubscriptionPage);

// Handle subscription form submiss
