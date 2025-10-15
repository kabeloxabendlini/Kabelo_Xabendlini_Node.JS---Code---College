// main.js

// =======================================================
// This file is the main entry point of the application.
// It sets up an Express.js web server, defines middleware,
// and connects route handlers from the homeController.
// =======================================================


// -------------------------------------------------------
// Import Required Modules
// -------------------------------------------------------

// Import the Express framework (used to build web servers)
const express = require("express");

// Import the controller module that contains route logic
// The controller handles what happens when specific routes are accessed
const homeController = require("./controllers/homeController");


// -------------------------------------------------------
// Define Server Configuration
// -------------------------------------------------------

// Define the port number on which the server will listen
const port = 3000;

// Create an instance of an Express application
const app = express();


// -------------------------------------------------------
// Middleware: Logging Each Request
// -------------------------------------------------------

// This middleware runs for every incoming request
// It logs the requested URL to the console for debugging or tracking
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);

  // Pass control to the next middleware or route
  next();
});


// -------------------------------------------------------
// Middleware: Body Parsing
// -------------------------------------------------------

// Parses incoming requests with URL-encoded data (from HTML forms)
// Setting 'extended: false' means it will use the simpler querystring library
app.use(express.urlencoded({ extended: false }));

// Parses incoming requests with JSON data (commonly used in APIs)
app.use(express.json());


// -------------------------------------------------------
// Route: GET request for the root URL ("/")
// -------------------------------------------------------

// When a user visits http://localhost:3000/ in the browser,
// this route sends a welcome message as a response
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});


// -------------------------------------------------------
// Route: GET request with a dynamic URL parameter
// -------------------------------------------------------
// Example: Visiting http://localhost:3000/items/tomato
// The word "tomato" is treated as a variable called 'vegetable'
// This route calls a function from the homeController to handle it
app.get("/items/:vegetable", homeController.sendReqParam);


// -------------------------------------------------------
// Route: POST request for the root URL ("/")
// -------------------------------------------------------
// Example: Sending a POST request via a form or an API tool like Postman
// This route also delegates handling to the controller
app.post("/", homeController.sendPost);


// -------------------------------------------------------
// Start the Express.js Server
// -------------------------------------------------------

// This starts the web server and listens for requests on the defined port
// When the server successfully starts, a confirmation message appears in the console
app.listen(port, () => {
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});