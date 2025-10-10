// Define an object (a simple route map) that links specific URL paths to HTML responses
// Each key is a URL route, and each value is the HTML content to send back
const routeResponseMap = {
    "/info": "<h1>Info Page</h1>", // Response for the /info route
    "/contact": "<h1>Contact Us</h1>", // Response for the /contact route
    "/about": "<h1>Learn More About Us.</h1>", // Response for the /about route
    "/hello": "<h1>Say hello by emailing us <a href=\"https://mail.google.com/\">here</a></h1>", // Response for /hello
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>" // Response for /error
};

// Define the port number where the server will listen
const port = 3000;

// Import Node.js's built-in 'http' module to create an HTTP server
const http = require("http");

// Import the 'http-status-codes' module for readable HTTP status names (e.g., OK = 200)
const httpStatus = require("http-status-codes");

// Create the HTTP server
const app = http.createServer((req, res) => {
    // Set the response header:
    // Status code 200 (OK) and Content-Type as HTML so browsers interpret it correctly
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    // Check if the requested URL exists in the routeResponseMap object
    if (routeResponseMap[req.url]) {
        // If the route exists, wait 2 seconds before sending the response
        // (simulating a delay, e.g., server processing or network latency)
        setTimeout(() => {
            // Send the corresponding HTML response from the routeResponseMap
            res.end(routeResponseMap[req.url]);
        }, 2000);
    } else {
        // If the requested route does not exist, send a default welcome message
        res.end("<h1>Welcome!</h1>");
    }
});

// Start the server and make it listen on the defined port (3000)
app.listen(port);

// Log a confirmation message to indicate the server is up and running
console.log(`The server has started and is listening on port number: ${port}`);