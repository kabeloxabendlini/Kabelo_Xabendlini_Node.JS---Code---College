// controllers/homeController.js

exports.sendReqParam = (req, res) => {
  const veg = req.params.vegetable;
  res.send(`This page is for ${veg}`);
};

exports.sendPost = (req, res) => {
  console.log("Body:", req.body);
  console.log("Query:", req.query);
  res.send("POST Successful!");
};

exports.respondWithName = (req, res) => {
  const name = req.params.myName;
  res.send(`Hello, ${name}!`);
};