// Enable strict mode for better error handling and cleaner JavaScript syntax.
// This prevents the use of undeclared variables and other unsafe actions.
"use strict";

// Define and import necessary modules and files for the server.
const port = 3000, // The port number where the server will listen for incoming requests.
    http = require("http"), // Built-in Node.js module for creating an HTTP server.
    httpStatus = require("http-status-codes"), // Module providing readable HTTP status code constants.
    router = require("./router"), // Custom router module that defines how different routes are handled.
    contentTypes = require("./contentTypes"), // Custom module that stores MIME types (e.g., HTML, CSS, PNG, etc.).
    utils = require("./utils"); // Utility module for helper functions (e.g., reading and serving files).

/* ---------- ROUTE HANDLERS (GET REQUESTS) ---------- */

// Route for the root path ("/") — serves the main homepage (index.html)
router.get("/", (req, res) => {
    // Send a response header: 200 OK, with content type HTML.
    res.writeHead(httpStatus.OK, contentTypes.html);
    // Use a utility function to read and serve the HTML file to the client.
    utils.getFile("views/index.html", res);
});

// Route for the courses page — serves courses.html
router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/courses.html", res);
});

// Route for the contact page — serves contact.html
router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/contact.html", res);
});

/* ---------- ROUTE HANDLER (POST REQUEST) ---------- */

// Handle a POST request to the root path.
// For example, when a form on the site is submitted, it will respond with a "Thank You" page.
router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/thanks.html", res);
});

/* ---------- IMAGE ROUTES ---------- */

// Serve an image file named "graph.png" from the public/images directory.
router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile("public/images/graph.png", res);
});

// Serve another image file named "people.jpg".
router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/people.jpg", res);
});

// Serve an image file named "product.jpg".
router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/product.jpg", res);
});

/* ---------- CSS ROUTES ---------- */

// Serve the main stylesheet for the website.
router.get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/confetti_cuisine.css", res);
});

// Serve the Bootstrap framework stylesheet (used for styling and layout).
router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap.css", res);
});

/* ---------- JAVASCRIPT ROUTES ---------- */

// Serve the website’s main JavaScript file.
router.get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile("public/js/confetti_cuisine.js", res);
});

/* ---------- SERVER CREATION ---------- */

// Create the HTTP server and pass the router’s 'handle' function to manage requests.
http.createServer(router.handle).listen(port);

// Log a message to confirm that the server is running and listening on the given port.
console.log(`The server is listening on port number: ${port}`);

/*
    🔍 EXPLANATION:
    The utils.getFile() function (from the utils module) is used to read the contents 
    of a file from the specified path (e.g., "public/images/graph.png") and send that 
    file’s data as the HTTP response. This allows the server to serve static files 
    like HTML pages, CSS files, JavaScript files, and images. */