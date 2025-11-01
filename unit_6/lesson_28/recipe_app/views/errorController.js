// controllers/errorController.js

"use strict";

// 404 Page Not Found
exports.pageNotFoundError = (req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: req.url
  });
};

// 500 Internal Server Error
exports.internalServerError = (err, req, res, next) => {
  console.error("❌ Internal Server Error:", err.stack);
  res.status(500).render("500", {
    pageTitle: "Internal Server Error",
    error: err
  });
};

