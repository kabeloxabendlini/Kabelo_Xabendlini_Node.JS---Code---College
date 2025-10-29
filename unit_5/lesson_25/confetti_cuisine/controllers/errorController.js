"use strict";

exports.pageNotFoundError = (req, res) => {
  res.status(404);
  res.render("error", { error: "Page not found!" });
};

exports.internalServerError = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500);
  res.render("error", { error: "Internal Server Error!" });
};
