// Define the port number the server will listen on
const port = 3000;

// Import the Express framework, which simplifies creating web servers in Node.js
const express = require("express");

// Initialize (create) an Express application
// The `app` object gives us access to Express methods like .get(), .post(), etc.
const app = express();

// Define a route handler for the root URL ("/")
// When a GET request is made to "/", this callback function will run
app.get("/", (req, res) => {

    // Log various request objects for debugging and learning purposes

    console.log(req.params);  // Logs any route parameters (e.g., "/users/:id" → id)
    console.log(req.body);    // Logs the request body (usually used in POST requests)
    console.log(req.url);     // Logs the URL path that was requested (e.g., "/")
    console.log(req.query);   // Logs any query string parameters (e.g., "?name=John")

    // Send a response back to the client
    // The client (e.g., browser) will see "Hello, Universe!" displayed
    res.send("Hello, Universe!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
});

// Start the Express server
// The app will listen for incoming connections on the specified port (3000)
app.listen(port, () => {
    // This message confirms the server is running successfully
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});