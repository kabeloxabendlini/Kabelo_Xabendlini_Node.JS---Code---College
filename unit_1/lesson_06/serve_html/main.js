// Define the port number where the server will listen for incoming requests.
const port = 3000;

// Import the built-in 'http' module — used to create an HTTP server in Node.js.
const http = require("http");

// Import the 'http-status-codes' module — provides constants for standard HTTP status codes (e.g., 200 for OK).
const httpStatusCodes = require("http-status-codes");

// Import a custom router module (likely a user-defined file named 'router.js' in the same directory).
// This module handles routing logic (i.e., determining which response to send for each request path).
const router = require("./router");

// Import the 'fs' (File System) module — used for reading files from the system (e.g., HTML files).
const fs = require("fs");

// Define an object representing plain text response headers.
// 'Content-Type: text/plain' tells the browser the server is sending plain text data.
const plainTextContentType = {
    "Content-Type": "text/plain"
};

// Define an object representing HTML response headers.
// 'Content-Type: text/html' tells the browser the server is sending HTML data.
const htmlContentType = {
    "Content-Type": "text/html"
};

// Create a helper function to read and send a file as a response.
// Parameters:
//  - file: The path to the file you want to read.
//  - res: The HTTP response object used to send data back to the client.
const customReadFile = (file, res) => {
    // Read the specified file asynchronously.
    fs.readFile(`./${file}`, (errors, data) => {
        // If an error occurs while reading the file, log a message to the console.
        if (errors) {
            console.log("Error reading the file...");
        }
        // Send the file data as the HTTP response body.
        res.end(data);
    });
};

// Define a route for GET requests to the root URL ("/").
router.get("/", (req, res) => {
    // Send an HTTP response header with a 200 OK status and a plain text content type.
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    // Send a plain text message back to the client and end the response.
    res.end("INDEX"); // plain text response for "/"
});

// Define a route for GET requests to "/index.html".
router.get("/index.html", (req, res) => {
    // Send a header indicating an HTML content type and 200 OK status.
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    // Use the helper function to read and return the 'index.html' file located in the 'views' directory.
    customReadFile("views/index.html", res); // load and send index.html
});

// Define a route for POST requests to the root URL ("/").
router.post("/", (req, res) => {
    // Respond with a 200 OK status and plain text content type.
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    // Send a confirmation message to the client.
    res.end("POSTED"); // plain text response for POST request
});

// Create and start the HTTP server.
// 'router.handle' is the function that processes incoming requests and routes them appropriately.
http.createServer(router.handle).listen(3000);

// Log a message to the console confirming that the server is running and listening on the specified port.
console.log(`The server is listening on port number: ${port}`);

