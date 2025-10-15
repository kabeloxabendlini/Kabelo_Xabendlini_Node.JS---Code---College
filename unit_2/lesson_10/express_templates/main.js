// main.js

// ============================================================
// Main entry point of the application.
// Sets up an Express.js web server that uses the EJS
// templating engine, express-ejs-layouts for page layouts,
// and modular controllers for route handling.
// ============================================================


// ------------------------------------------------------------
// Import Required Modules
// ------------------------------------------------------------

const express = require("express");             // Express framework for web server
const app = express();                           // Create Express app instance
const homeController = require("./controllers/homeController"); // Controller with route logic
const layouts = require("express-ejs-layouts");  // EJS layout support for consistent page structure


// ------------------------------------------------------------
// App Configuration
// ------------------------------------------------------------

app.set("port", process.env.PORT || 3000);      // Port number (defaults to 3000 if none specified)
app.set("view engine", "ejs");                  // Set view engine to EJS for rendering templates


// ------------------------------------------------------------
// Middleware Setup
// ------------------------------------------------------------

app.use(layouts);                               // Enable EJS layouts
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data (HTML forms)
app.use(express.json());                         // Parse JSON data in requests

// Log every request to the console
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Continue to next middleware or route
});


// ------------------------------------------------------------
// Routes Setup
// ------------------------------------------------------------

// Root route (GET /)
// Renders the home page using EJS
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    firstName: "Kabelo"  // <-- pass firstName here
  });
});

// Route with dynamic URL parameter (vegetable)
// Example: GET /items/carrot
// Handled by homeController.sendReqParam
app.get("/items/:vegetable", homeController.sendReqParam);

// Route for POST requests to root URL (/)
// Handled by homeController.sendPost
app.post("/", homeController.sendPost);

// Route with dynamic URL parameter (name)
// Example: GET /name/Kabelo
// Handled by homeController.respondWithName
app.get("/name/:myName", homeController.respondWithName);


// ------------------------------------------------------------
// Start the Server
// ------------------------------------------------------------

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});