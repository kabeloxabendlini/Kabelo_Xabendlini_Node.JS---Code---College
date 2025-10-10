// Define the port number where the server will listen for requests
const port = 3000;

// Import the built-in 'http' module to create an HTTP server
const http = require("http");

// Import the 'http-status-codes' module for readable HTTP status constants (like 200, 404, etc.)
const httpStatus = require("http-status-codes");

// Create an HTTP server instance (but don’t define the request handler yet)
const app = http.createServer();

// Define a helper function that converts a JavaScript object into a formatted JSON string
// JSON.stringify(obj, null, 2) pretty-prints with 2 spaces for readability
const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

// Attach an event listener for the 'request' event
// This function runs every time the server receives a new HTTP request
app.on("request", (req, res) => {
    // Create an empty array to hold incoming chunks of request body data
    let body = [];

    // The 'data' event is triggered whenever a chunk of data is received from the client
    req.on("data", (bodyData) => {
        // Push each chunk of data into the 'body' array
        body.push(bodyData);
    });

    // The 'end' event fires when all the data has been received
    req.on("end", () => {
        // Concatenate all chunks and convert the Buffer data to a string
        body = Buffer.concat(body).toString();

        // Log the complete request body to the console
        console.log(`Request Body Contents: ${body}`);
    });

    // Log the HTTP method (e.g., GET, POST) to the console
    console.log(`Method: ${getJSONString(req.method)}`);

    // Log the requested URL path (e.g., "/home") to the console
    console.log(`URL: ${getJSONString(req.url)}`);

    // Log all the request headers (like content-type, user-agent, etc.)
    console.log(`Headers: ${getJSONString(req.headers)}`);

    // Send an HTTP response header to the client
    // Status code: 200 (OK)
    // Content-Type: HTML (so the browser interprets the response as an HTML page)
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    // Define the HTML message that will be sent to the browser
    let responseMessage = "<h1>This will show on the screen.This is the server command!</h1>";

    // End the response and send the message to the client
    res.end(responseMessage);
});

// Start the server and make it listen on the defined port (3000)
app.listen(port);

// Log a confirmation message to indicate the server is running
console.log(`The server has started and is listening on port number: ${port}`);