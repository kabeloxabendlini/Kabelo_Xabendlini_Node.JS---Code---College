"use strict";

// Home Controller
module.exports = {
  index: (req, res, next) => {
    // You can fetch data here if needed
    res.locals.title = "Home | Confetti Cuisine";
    next(); // Pass to indexView if you want layered rendering
  },

  index: (req, res, next) => {
    res.render("home"); // This must match views/home.ejs
  }
};
