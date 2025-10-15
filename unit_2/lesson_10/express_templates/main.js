// Import the Express framework
// Express is a Node.js framework that simplifies building web servers
const express = require("express");

// Create an instance of the Express application
// The `app` object allows you to configure routes, middleware, and settings
const app = express();

// Import the controller module that contains the logic for handling routes
const homeController = require("./controllers/homeController");

// Import express-ejs-layouts to manage layout templates for EJS
// This allows consistent page headers, footers, and layout structure
const layouts = require("express-ejs-layouts");


// ------------------------------------------------------------
// App Configuration
// ------------------------------------------------------------

// Set the port number the server will listen on
// Use the PORT environment variable if available, otherwise default to 3000
app.set("port", process.env.PORT || 3000);

// Set EJS as the templating engine
// This allows rendering dynamic HTML using .ejs files
app.set("view engine", "ejs");


// ------------------------------------------------------------
// Middleware Setup
// ------------------------------------------------------------

// Enable EJS layouts for shared template structure
app.use(layouts);

// Parse URL-encoded data (from forms)
// 'extended: false' means using the default querystring library
app.use(express.urlencoded({ extended: false }));

// Parse JSON request bodies
// Useful for handling POST requests that send JSON
app.use(express.json());

// Custom middleware to log every request URL
// Helps with debugging and monitoring incoming requests
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});


// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------

// Root route (GET /)
// This handles requests to the home page and sends a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Dynamic route for vegetables (GET /items/:vegetable)
// Example: /items/carrot
// The logic for handling this route is in homeController.sendReqParam
app.get("/items/:vegetable", homeController.sendReqParam);

// POST route for root (POST /)
// Handles form submissions or API requests
// Logic is in homeController.sendPost
app.post("/", homeController.sendPost);

// Dynamic route for names (GET /name/:myName)
// Example: /name/Kabelo
// The logic is handled by homeController.respondWithName
app.get("/name/:myName", homeController.respondWithName);


// ------------------------------------------------------------
// Start Server
// ------------------------------------------------------------

// Start the server and listen on the configured port
// Logs a message to confirm the server is running
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});