// controllers/homeController.js

exports.showHome = (req, res) => {
  const name = req.query.name || "Visitor";
  res.render("index", { name });
};

exports.respondWithName = (req, res) => {
  const userName = req.params.myName;
  res.render("name", { personName: userName });
};