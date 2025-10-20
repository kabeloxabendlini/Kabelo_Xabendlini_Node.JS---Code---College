// Enable strict mode to catch common JavaScript errors early
"use strict";

const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController"); // must exist

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
// -----------------------------------------------------------
// ⚙️ Middleware Setup
// -----------------------------------------------------------

// Parse URL-encoded data (e.g., data from HTML forms)
// Setting `extended: false` uses Node’s built-in querystring library
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Parse incoming JSON data (used for APIs or AJAX requests)
app.use(express.json());

// Enable EJS layouts (to reuse headers, footers, etc.)
app.use(layouts);

// Serve static files from the "public" directory
// e.g., CSS, images, and client-side JavaScript
app.use(express.static("public"));

// -----------------------------------------------------------
// 🚦 Route Definitions
// -----------------------------------------------------------

// Route for the homepage — uses a controller method to render the view
app.get("/", homeController.showHome);

// Route that accepts a dynamic parameter ":myName"
// Example: visiting http://localhost:3000/name/Kabelo
// Will display a personalized greeting page
app.get("/name/:myName", homeController.respondWithName);

// -----------------------------------------------------------
// 🚀 Start the Server
// -----------------------------------------------------------

// Start the server and listen on the specified port
app
  .listen(app.get("port"), () => {
    console.log(`✅ Server is running on http://localhost:${app.get("port")}`);
  })
  // Handle startup errors gracefully (e.g., if port is already in use)
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err);
  });