// Controller function to handle requests with a route parameter
exports.sendReqParam = (req, res) => {
  // Extract the "vegetable" parameter from the URL (e.g., /items/carrot)
  let veg = req.params.vegetable;

  // Send a response back to the client with a custom message
  res.send(`This is the page for ${veg}`);
};

// Controller function to handle POST requests
exports.sendPost = (req, res) => {
  // Log the body of the request (data sent via forms or JSON)
  console.log(req.body);

  // Log the query parameters (data in the URL after '?')
  console.log(req.query);

  // Send a success message back to the client
  res.send("POST Successful!");
};

// Controller function to handle routes that pass a name parameter
exports.respondWithName = (req, res) => {
  // Alternative approach (commented out):
  // let paramsName = req.params.myName;
  // res.render("index", { name: paramsName });

  // Render the "index.ejs" view template
  // Pass the name from the route parameter as a variable called "firstName"
  // Example: /name/Kabelo → renders index.ejs with { firstName: "Kabelo" }
  res.render("index", { firstName: req.params.myName });
};