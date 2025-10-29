"use strict";

exports.index = (req, res) => {
  res.render("index", { title: "Welcome to Confetti Cuisine" });
};

exports.contact = (req, res) => {
  res.render("contact");
};
