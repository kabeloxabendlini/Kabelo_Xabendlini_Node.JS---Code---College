"use strict"; // Enforce strict mode for better error handling and cleaner JavaScript

/**
 * ==============================
 *  Module Imports & Setup
 * ==============================
 */

const express = require("express");
const app = express(); // Create Express app instance
const router = express.Router(); // Create a router instance to organize routes
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Controllers (import route logic for different parts of the app)
const errorController = require("./controllers/errorController"); // Handles errors
const homeController = require("./controllers/homeController"); // Handles homepage and general pages
const subscribersController = require("./controllers/subscribersController"); // Manages subscriber logic
const usersController = require("./controllers/usersController"); // Manages user accounts
const coursesController = require("./controllers/coursesController"); // Handles course listings and creation

// Models (define how data is structured in MongoDB)
const Subscriber = require("./models/subscriber");

/**
 * ==============================
 *  MongoDB Connection (Mongoose)
 * ==============================
 */

// Use native JavaScript promises with Mongoose
mongoose.Promise = global.Promise;

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost:27017/recipe_db")
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

const db = mongoose.connection;

// Once the connection is open, confirm success in console
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

/**
 * ==============================
 *  Express App Configuration
 * ==============================
 */

app.set("port", process.env.PORT || 3000); // Use environment port or default to 3000
app.set("view engine", "ejs"); // Set EJS as the templating engine

/**
 * ==============================
 *  Middleware Setup
 * ==============================
 */

// Serve static files (CSS, JS, images) from the "public" folder
router.use(express.static("public"));

// Enable layout support for EJS (to use layout.ejs templates)
router.use(layouts);

// Parse URL-encoded form data (from HTML forms)
router.use(
  express.urlencoded({
    extended: false, // Use classic querystring library
  })
);

// Parse JSON payloads (for API requests or AJAX)
router.use(express.json());

// Custom middleware — logs incoming request paths for debugging
router.use(homeController.logRequestPaths);

/**
 * ==============================
 *  Route Definitions
 * ==============================
 */

// ---------- Home Routes ----------
router.get("/", homeController.index); // Render home page (index.ejs)
router.get("/contact", homeController.getSubscriptionPage); // Render contact/subscription form

// ---------- User Routes ----------
router.get("/users", usersController.index, usersController.indexView); // Show all users
router.get("/users/new", usersController.new); // Show "new user" form
router.post("/users/create", usersController.create, usersController.redirectView); // Create new user
router.get("/users/:id", usersController.show, usersController.showView); // Show specific user profile

// ---------- Subscriber Routes ----------
router.get("/subscribers", subscribersController.index, subscribersController.indexView); // Show all subscribers
router.get("/subscribers/new", subscribersController.new); // Show "new subscriber" form
router.post(
  "/subscribers/create",
  subscribersController.create, // Save new subscriber
  subscribersController.redirectView // Redirect after creation
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView); // Show specific subscriber

// ---------- Course Routes ----------
router.get("/courses", coursesController.index, coursesController.indexView); // Show all courses
router.get("/courses/new", coursesController.new); // Show "new course" form
router.post("/courses/create", coursesController.create, coursesController.redirectView); // Create new course
router.get("/courses/:id", coursesController.show, coursesController.showView); // Show course details

// ---------- Subscription Route ----------
router.post("/subscribe", subscribersController.saveSubscriber); // Handle subscription form submissions

/**
 * ==============================
 *  Error Handling Middleware
 * ==============================
 */

// Log errors to the console (for development)
router.use(errorController.logErrors);

// Handle 404 errors (page/resource not found)
router.use(errorController.respondNoResourceFound);

// Handle 500 errors (server/internal issues)
router.use(errorController.respondInternalError);

/**
 * ==============================
 *  Mount Router & Start Server
 * ==============================
 */

// Mount all defined routes under the root path ("/")
app.use("/", router);

// Start the Express server
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at: http://localhost:${app.get("port")}`);
});
