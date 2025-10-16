// Enable strict mode to enforce cleaner, more secure JavaScript syntax
"use strict";

// Export the controller function so it can be imported and used in other files
exports.respondWithName = (req, res) => {
  // Extract the value of the "myName" route parameter from the request URL
  // Example: if the URL is "/name/Kabelo", then req.params.myName = "Kabelo"
  let paramsName = req.params.myName;

  // Render the "index.ejs" view template and pass the name variable to it
  // The EJS file can then use <%= name %> to display the value dynamically
  res.render("index", { name: paramsName });
};