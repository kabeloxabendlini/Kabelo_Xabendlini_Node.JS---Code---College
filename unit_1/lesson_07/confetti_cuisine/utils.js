"use strict"; 
// Enables strict mode which helps catch common mistakes 
// like using undeclared variables and improves overall code safety

// Import Node.js built-in 'fs' module to interact with the file system
const fs = require("fs"),

    // Import HTTP status codes for standardized responses
    httpStatus = require("http-status-codes"),

    // Import content types (MIME types) for setting response headers
    contentTypes = require("./contentTypes");

// Export an object with utility functions for use in other modules
module.exports = {
    // Function to read a file from disk and send it in the HTTP response
    getFile: (file, res) => {
        // Read the file from the file system asynchronously
        fs.readFile(`./${file}`, (error, data) => {
            // If an error occurs while reading the file (e.g., file not found)
            if (error) {
                // Set HTTP status to 500 (Internal Server Error) and content type to HTML
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);

                // Send an error message to the client
                res.end("There was an error serving content!");
            }

            // If no error, send the file contents as the response
            res.end(data);
        });
    }
};

// Notes:
// 1. fs.readFile is asynchronous, meaning Node.js won't block other requests while reading the file.
// 2. The 'res' object comes from the HTTP server and is used to send data back to the client.
// 3. This utility simplifies sending static files like HTML, CSS, JS, and images.