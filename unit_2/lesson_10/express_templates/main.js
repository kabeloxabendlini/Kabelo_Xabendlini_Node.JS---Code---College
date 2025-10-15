// main.js

// ============================================================
// This is the main entry point of the application.
// It sets up an Express.js web server that uses the EJS
// templating engine and modular controllers for route handling.
// ============================================================


// ------------------------------------------------------------
// Import Required Modules
// ------------------------------------------------------------

// Import the Express framework (used for building the web server)
const express = require("express");

// Create an instance of an Express application
const app = express();

// Import the controller file that contains route-handling logic
const homeController = require("./controllers/homeController");

// Import the express-ejs-layouts module for template layout support
// It helps manage shared page structures (like headers and footers)
const layouts = require("express-ejs-layouts");


// ------------------------------------------------------------
// App Configuration
// ------------------------------------------------------------

// Define the port number the server will listen on.
// If an environment variable PORT is defined (e.g., by a hosting service),
// use that value. Otherwise, default to port 3000.
app.set("port", process.env.PORT || 3000);

// Set the view engine to EJS (Embedded JavaScript Templates).
// This allows rendering of dynamic HTML pages using .ejs templates.
app.set("view engine", "ejs");


// ------------------------------------------------------------
// Middleware Setup
// ------------------------------------------------------------

// Enable EJS layouts so pages can share a common structure (layout.ejs).
app.use(layouts);

// Enable parsing of URL-encoded data (such as from HTML form submissions).
// Setting 'extended: false' uses the simpler querystring library.
app.use(
  express.urlencoded({
    extended: false
  })
);

// Enable parsing of incoming JSON request bodies.
// Useful when working with APIs or JavaScript-based frontends.
app.use(express.json());

// Custom middleware that logs every request made to the server.
// Helps with debugging and understanding server traffic.
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});


// ------------------------------------------------------------
// Routes Setup
// ------------------------------------------------------------

// Route 1: Handles GET requests with a dynamic URL parameter (vegetable name)
// Example: http://localhost:3000/items/carrot
// This route calls the sendReqParam() function from homeController.
app.get("/items/:vegetable", homeController.sendReqParam);

// Route 2: Handles POST requests to the root URL ("/")
// Typically triggered by submitting a form or API POST request.
// The logic for this route is defined in homeController.sendPost().
app.post("/", homeController.sendPost);

// Route 3: Handles GET requests with a name parameter
// Example: http://localhost:3000/name/Kabelo
// This calls homeController.respondWithName() to generate a response.
app.get("/name/:myName", homeController.respondWithName);


// ------------------------------------------------------------
// Start the Server
// ------------------------------------------------------------

// The app listens on the configured port and logs a confirmation message
// once the server is up and running.
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});