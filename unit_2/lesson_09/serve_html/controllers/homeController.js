// controllers/homeController.js

// ==============================
// This file defines and exports controller functions
// used to handle specific routes in main.js.
// Controllers help separate route logic from app setup,
// keeping your code organized and modular.
// ==============================


// -----------------------------------------------------
// Function: sendReqParam
// Purpose: Handles GET requests made to the route /items/:vegetable
// Example URL: http://localhost:3000/items/carrot
// -----------------------------------------------------
exports.sendReqParam = (req, res) => {
  // Extracts the 'vegetable' parameter from the URL.
  // For example, if the URL is /items/tomato,
  // then req.params.vegetable will be "tomato".
  let veg = req.params.vegetable;

  // Sends a response message back to the client,
  // dynamically including the vegetable name.
  res.send(`This page is for ${veg}`);
};



// -----------------------------------------------------
// Function: sendPost
// Purpose: Handles POST requests sent to the root URL ("/")
// Example: a form submission or API POST request to http://localhost:3000/
// -----------------------------------------------------
exports.sendPost = (req, res) => {
  // Logs the request body (data sent from forms or JSON payloads)
  // to the console for debugging or inspection.
  console.log("Body:", req.body);

  // Logs any query parameters that may be appended to the URL,
  // for example: http://localhost:3000/?name=Kabelo
  console.log("Query:", req.query);

  // Sends a confirmation message back to the client.
  res.send("POST Successful!");
};