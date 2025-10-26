"use strict";

exports.respondNoResourceFound = (req, res) => {
  res.status(404).render("404");
};

exports.respondInternalError = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).render("500");
};
