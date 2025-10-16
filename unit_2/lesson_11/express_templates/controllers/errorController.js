// Import the http-status-codes module
// This provides easy-to-read constants for standard HTTP status codes (e.g., 404, 500)
const httpStatus = require("http-status-codes");

// Middleware function to log errors that occur in the app
exports.logErrors = (error, req, res, next) => {
  // Print the full error stack trace to the console (useful for debugging)
  console.error(error.stack);

  // Pass the error object to the next middleware function
  // This allows the next error handler to handle the error appropriately
  next(error);
};

// Middleware function to handle 404 (Not Found) errors
exports.respondNoResourceFound = (req, res) => {
  // Define the HTTP status code for "Not Found" (404)
  let errorCode = httpStatus.NOT_FOUND;

  // Set the response status to 404
  res.status(errorCode);

  // Send a custom 404 HTML page stored in the 'public' directory
  // The 'root' option defines the base directory for the file path
  res.sendFile(`./public/${errorCode}.html`, { root: "./" });
};

// Middleware function to handle 500 (Internal Server Error)
exports.respondInternalError = (error, req, res, next) => {
  // Define the HTTP status code for "Internal Server Error" (500)
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;

  // Log the error message and stack trace for debugging
  console.log(`ERROR occurred: ${error.stack}`);

  // Set the response status to 500
  res.status(errorCode);

  // Send a simple error message as the response
  // This could also be replaced with a custom error page (HTML) if desired
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};