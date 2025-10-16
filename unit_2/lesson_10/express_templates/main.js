// Enable strict mode for cleaner, more secure JavaScript
// Helps prevent common coding mistakes (e.g., using undeclared variables)
"use strict";

// Import the Express framework, which simplifies creating web servers in Node.js
const express = require("express");

// Create an instance of an Express application
const app = express();

// Import your controller that handles routes and responses
const homeController = require("./controllers/homeController");

// Import express-ejs-layouts to enable layout support in EJS templates
const layouts = require("express-ejs-layouts");

// ----- Application Configuration ----- //

// Set the server port (use an environment variable if available, otherwise 3000)
app.set("port", process.env.PORT || 3000);

// Set EJS (Embedded JavaScript) as the templating engine
// This allows you to use .ejs files for dynamic HTML rendering
app.set("view engine", "ejs");

// (Optional) If your views are in a custom folder, you can specify it like this:
// app.set("views", "./views");

// ----- Middleware Setup ----- //

// Middleware to parse incoming form data (from POST requests)
// `extended: false` uses the querystring library to parse URL-encoded data
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Middleware to parse incoming JSON data (from APIs or AJAX requests)
app.use(express.json());

// Enable the use of EJS layout templates across all rendered views
app.use(layouts);

// ----- Route Definitions ----- //

// Route that responds to GET requests with a name parameter in the URL
// Example: visiting /name/Kabelo will render a page that says "Hello, Kabelo"
app.get("/name/:myName", homeController.respondWithName);

// You could also define a static route (currently commented out)
// app.get("/name", homeController.respondWithName);

// ----- Start the Server ----- //

// Start the server and listen on the specified port
// The callback logs a confirmation message when the server is running
app
  .listen(app.get("port"), () => {
    console.log(`Server is running on port number: ${app.get("port")}`);
  })

  // Handle startup errors gracefully (e.g., if the port is already in use)
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });