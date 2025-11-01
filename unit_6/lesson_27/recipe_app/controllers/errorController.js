// controllers/errorController.js
"use strict";

exports.pageNotFoundError = (req, res, next) => {
  res.status(404);
  res.render("404"); // 404.ejs must exist in views
};

exports.internalServerError = (err, req, res, next) => {
  console.error("❌ Internal Server Error:", err.stack);
  res.status(500);
  res.render("500", { error: err }); // 500.ejs must exist in views
};
