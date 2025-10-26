"use strict";

const User = require("../models/user"); // Make sure models/user.js exists

module.exports = {
  // Middleware to fetch all users
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.error(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  // Render view with fetched users
  indexView: (req, res) => {
    res.render("users/index", { users: res.locals.users });
  },

  // Show a single user (optional)
  show: (req, res) => {
    res.send("Showing a single user!");
  }
};