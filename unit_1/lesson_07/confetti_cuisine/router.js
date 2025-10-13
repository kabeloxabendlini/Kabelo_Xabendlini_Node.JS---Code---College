"use strict"; 
// Enables strict mode to catch common coding mistakes 
// and enforce safer JavaScript practices

// Import HTTP status codes for standardized response codes
const httpStatus = require("http-status-codes"), 

    // Import content types (MIME types) for setting response headers
    contentTypes = require("./contentTypes"),

    // Import utility functions (like getFile) for sending files
    utils = require("./utils");

// Create a routes object to store all GET and POST route handlers
const routes = { 
    GET: {},  // Object to hold all GET routes
    POST: {}  // Object to hold all POST routes
};

// The main function to handle incoming HTTP requests
// It receives the request (req) and response (res) objects
exports.handle = (req, res) => { 
    try {
        // Attempt to find a handler for the requested HTTP method and URL
        // routes[req.method][req.url] retrieves the function registered for this route
        // and executes it with the req and res objects
        routes[req.method][req.url](req, res); 
    } catch (e) { 
        // If no handler is found (or an error occurs), send a generic error page
        res.writeHead(httpStatus.OK, contentTypes.html);
        utils.getFile("views/error.html", res);
    }
};

// Function to register GET route handlers
// url: the path (e.g., "/"), action: the function to execute for this route
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

// Function to register POST route handlers
// url: the path (e.g., "/submit"), action: the function to execute for this route
exports.post = (url, action) => {
    routes["POST"][url] = action;
};

// Notes:
// 1. The 'action' is a callback function that defines what happens when the route is accessed.
// 2. This router allows your server to respond differently to GET and POST requests on the same URL.
// 3. If a route is not registered, the error page "views/error.html" is returned.