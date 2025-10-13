// Import the 'http-status-codes' module to use predefined constants for HTTP status codes 
// (e.g., 200 for OK, 404 for Not Found, etc.)
const httpStatus = require("http-status-codes");

// Define an object representing the HTTP header for HTML responses.
// It tells the browser that the server will send HTML-formatted data.
const htmlContentType = {
    "Content-Type": "text/html"
};

// Define an object that stores the available routes for the application.
// It organizes routes by HTTP methods (GET, POST, etc.).
// Each method holds key-value pairs where the key is the URL path (e.g., "/info")
// and the value is the function that should run when that route is requested.
const routes = {
    "GET": {
        // Define a GET route for the URL path "/info".
        "/info": (req, res) => {
            // Set the response header to "200 OK" with a content type of plain text.
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/plain"
            });

            // Send a plain text message as the response body.
            res.end("Welcome to the Info Page!");
        }
    },

    // Prepare an empty POST object for POST routes that will be added later dynamically.
    "POST": {}
};

// Export a function named 'handle' that will be used by the main server file.
// This function processes each incoming request and determines which route to execute.
exports.handle = (req, res) => {
    try {
        // Check if a route exists for the request method (GET or POST)
        // and the specific URL requested by the client.
        if (routes[req.method][req.url]) {
            // If a matching route exists, call the associated function.
            routes[req.method][req.url](req, res);
        } else {
            // If no matching route is found, send a 404 Not Found error.
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            // Respond with a simple HTML error message.
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        // If any unexpected error occurs while processing the request,
        // log the error message to the console for debugging.
        console.log("error: " + ex);
    }
};

// Export a 'get' function that allows other files to register new GET routes dynamically.
// Parameters:
//   - url: the route path (e.g., "/home")
//   - action: the function that should handle requests to that path
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

// Export a 'post' function that allows other files to register new POST routes dynamically.
// Parameters:
//   - url: the route path (e.g., "/submit")
//   - action: the function that should handle POST requests to that path
exports.post = (url, action) => {
    routes["POST"][url] = action;
};