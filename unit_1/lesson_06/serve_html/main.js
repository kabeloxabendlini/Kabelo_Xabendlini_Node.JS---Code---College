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

// ---------------------------- Example 1 ---------------------------------------//
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
// ---------------------------------------- Example 1 ---------------------------------//

// // Define a helper function that sends an error response when a requested file cannot be found.
// const sendErrorResponse = res => {
//   // Set the response status code to 404 (Not Found) and the content type to HTML.
//   res.writeHead(httpStatus.NOT_FOUND, {
//     "Content-Type": "text/html"
//   });
//   // Write a simple HTML error message to the response body.
//   res.write("<h1>File Not Found!</h1>");
//   // End the response so no further data is sent.
//   res.end();
// };

// // Create an HTTP server using the Node.js 'http' module.
// http
//   .createServer((req, res) => {
//     // Store the requested URL (e.g., "/index.html" or "/public/css/style.css")
//     // so it can be used to determine what type of file is being requested.
//     let url = req.url;

//     /* 
//       The following series of 'if' and 'else if' statements checks the URL 
//       to determine which type of file the user is requesting. 
//       Based on the file extension (.html, .js, .css, .png), the server sets 
//       the correct 'Content-Type' header and serves the file from the proper directory.
//     */

//     // If the requested URL contains ".html" → serve an HTML file.
//     if (url.indexOf(".html") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html"
//       });
//       // Read and serve the HTML file from the 'views' directory.
//       customReadFile(`./views${url}`, res);
//     }

//     // If the requested URL contains ".js" → serve a JavaScript file.
//     else if (url.indexOf(".js") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/javascript"
//       });
//       // Read and serve the JS file from the 'public/js' directory.
//       customReadFile(`./public/js${url}`, res);
//     }

//     // If the requested URL contains ".css" → serve a CSS file.
//     else if (url.indexOf(".css") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/css"
//       });
//       // Read and serve the CSS file from the 'public/css' directory.
//       customReadFile(`./public/css${url}`, res);
//     }

//     // If the requested URL contains ".png" → serve an image file.
//     else if (url.indexOf(".png") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "image/png"
//       });
//       // Read and serve the PNG file from the 'public/images' directory.
//       customReadFile(`./public/images${url}`, res);
//     }

//     // If the URL doesn’t match any known file type, send a 404 error.
//     else {
//       sendErrorResponse(res);
//     }
//   })
//   // Make the server listen for incoming requests on port 3000.
//   .listen(3000);

// // Log a confirmation message when the server starts successfully.
// console.log(`The server is listening on port number: ${port}`);

// /* 
//   Define a helper function to read files and send their contents to the client.
//   It checks if the file exists, reads it, and sends the data as the response.
// */
// const customReadFile = (file_path, res) => {
//   // Check if the specified file exists in the file system.
//   if (fs.existsSync(file_path)) {
//     // Asynchronously read the file’s contents.
//     fs.readFile(file_path, (error, data) => {
//       if (error) {
//         // If an error occurs while reading the file, log it and send an error response.
//         console.log(error);
//         sendErrorResponse(res);
//         return;
//       }
//       // If the file was successfully read, write its data to the response.
//       res.write(data);
//       // End the response after sending the file.
//       res.end();
//     });
//   } else {
//     // If the file does not exist, send a 404 error response.
//     sendErrorResponse(res);
//   }
// };