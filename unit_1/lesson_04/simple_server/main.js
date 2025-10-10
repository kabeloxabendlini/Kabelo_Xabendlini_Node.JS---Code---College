// Enables Strict Mode — helps catch common JavaScript errors,  
// enforces cleaner syntax, and prevents the use of undeclared variables.
"use strict";

// Define the port number where the server will listen for incoming requests
const port = 3000;

// Import the built-in 'http' module to create an HTTP server
const http = require("http");

// Import the 'http-status-codes' module for readable HTTP status constants (like 200, 404, etc.)
const httpStatus = require("http-status-codes");

// Create an HTTP server using the 'createServer' method
// The callback function runs every time a request is received
const app = http.createServer((request, response) => {
    // Log a message to the console whenever a request is received
    console.log("Received an incoming request!");

    // Send a response header with status code 200 (OK)
    // and specify that the content type of the response is HTML
    response.writeHead(httpStatus.OK, {
        "Content-Type": "text/html" // status 200 = everything works
    });

    // Define the message that will be sent back to the browser
    let responseMessage = "<h1>Hello please update Node.JS!</h1>";

    // Write the response message to the client
    response.write(responseMessage);

    // End the response (must be called to finish sending data)
    response.end();

    // Log a message confirming the response was sent
    console.log(`Sent a response: ${responseMessage}`);
});

// Tell the server to start listening on the specified port (3000)
app.listen(port);

// Log a message once the server starts running successfully
console.log(`The server has started and is listening on port number: ${port}`);