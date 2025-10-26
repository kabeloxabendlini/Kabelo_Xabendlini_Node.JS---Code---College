"use strict";

/**
 * ========================================
 *   Error Controller
 * ========================================
 */
module.exports = {
  // 404 - Not Found
  respondNoResourceFound: (req, res) => {
    res.status(404);
    res.render("404"); // make sure a 404.ejs view exists
  },

  // 500 - Internal Server Error
  respondInternalError: (error, req, res, next) => {
    console.error(`❌ ERROR: ${error.stack}`);
    res.status(500);
    res.render("500", { error });
  }
};