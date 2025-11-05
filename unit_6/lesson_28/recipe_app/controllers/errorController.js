// controllers/errorController.js

"use strict";

exports.pageNotFound = (req, res) => {
  res.status(404);
  res.render("error");
};

exports.internalServerError = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500);
  res.send("500 - Server Error");
};
