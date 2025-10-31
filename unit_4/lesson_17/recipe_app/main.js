"use strict"; 
// Enforces strict mode to prevent unsafe JavaScript practices 
// (e.g., using undeclared variables, duplicate parameters, etc.)

// =======================
// Module Imports
// =======================

// Import the Express web framework
const express = require("express");

// Create a new Express application instance
const app = express();

// Import custom error-handling middleware functions
const errorController = require("./controllers/errorController");

// Import the controller responsible for home page and general routes
const homeController = require("./controllers/homeController");

// Import middleware that enables layout support for EJS templates
const layouts = require("express-ejs-layouts");

// Import Mongoose for working with MongoDB in an object-oriented way
const mongoose = require("mongoose");

// Import the Subscriber model that represents subscribers in MongoDB
const Subscriber = require("./models/subscriber");

// Import the controller that handles subscriber-related routes and logic
const subscriberController = require("./controllers/subscribersController");


// =======================
// Database Connection
// =======================

// Connect to the MongoDB database running locally on port 27017
// The database name is "recipe_app"
mongoose.connect("mongodb://0.0.0.0:27017/recipe_app")
  .then(() => console.log("Successfully connected to MongoDB")) // Log success message
  .catch(err => console.error("Connection error:", err)); // Log connection errors if any

// Create a reference to the active database connection
const db = mongoose.connection;

// Event listener that runs once the connection is successfully established
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});


// =======================
// Example Query
// =======================

// Example query to find all subscribers with the name "Leotha Gradwell"
// .exec() executes the query and returns a promise
const query = Subscriber.find({ name: "Leotha Gradwell" }).exec();

// Handle the resolved query result
query
  .then(docs => {
    console.log(docs); // Log matching subscriber documents
  })
  .catch(err => {
    console.error(err); // Log any errors that occur during the query
  });


// =======================
// Express App Configuration
// =======================

// Define which port the server should run on
// Use environment variable PORT if available, otherwise default to 3000
app.set("port", process.env.PORT || 3000);

// Set EJS as the template engine for rendering dynamic views
app.set("view engine", "ejs");


// =======================
// Middleware
// =======================

// Serve static files (like CSS, JavaScript, images) from the "public" folder
app.use(express.static("public"));

// Enable EJS layouts so that all views can share a consistent layout structure
app.use(layouts);

// Parse incoming form data encoded as URL-encoded strings (from HTML forms)
app.use(
  express.urlencoded({
    extended: false, // Only parse simple (non-nested) data structures
  })
);

// Parse incoming JSON request bodies (useful for API endpoints)
app.use(express.json());

// Custom middleware that logs every request path to the console
// Useful for debugging and monitoring route activity
app.use(homeController.logRequestPaths);


// =======================
// Routes
// =======================

// Route for the home page — renders "index.ejs"
app.get("/", homeController.index);

// Route for the courses page — renders "courses.ejs"
app.get("/courses", homeController.showCourses);

// Route for displaying all subscribers — renders "subscribers.ejs"
// The controller first retrieves all subscribers, then passes them to the view
app.get(
  "/subscribers",
  subscriberController.getAllSubscribers, // Fetch subscriber data
  (req, res, next) => {
    // Render the "subscribers" view with data fetched by the controller
    res.render("subscribers", { subscribers: req.data });
  }
);

// Route for showing the contact/subscription form — renders "contact.ejs"
app.get("/contact", subscriberController.getSubscriptionPage);

// Route that handles form submissions for new subscribers
// Invokes a controller method that saves the subscriber data to MongoDB
app.post("/subscribe", subscriberController.saveSubscriber);


// =======================
// Error Handling Middleware
// =======================

// Middleware for logging all application errors
app.use(errorController.logErrors);

// Middleware to handle 404 (Not Found) errors
app.use(errorController.respondNoResourceFound);

// Middleware to handle 500 (Internal Server) errors
app.use(errorController.respondInternalError);


// =======================
// Server Startup
// =======================

// Start the Express server and listen for incoming connections on the specified port
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
