"use strict";

// 404 Not Found
exports.respondNoResourceFound = (req, res, next) => {
  res.status(404);
  res.render("404", { url: req.originalUrl }); // make sure 404.ejs exists
};

// 500 Internal Server Error
exports.respondInternalError = (err, req, res, next) => {
  console.error("❌ Internal Server Error:", err);
  res.status(500);
  res.render("500", { error: err }); // make sure 500.ejs exists
};