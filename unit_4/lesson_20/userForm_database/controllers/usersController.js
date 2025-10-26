"use strict";

// Example user data (replace with your real database model if needed)
const User = require("../models/user"); // make sure you have a User model

// Get all users
exports.getAllUsers = async () => {
  try {
    const users = await User.find(); // fetch all users from MongoDB
    return users;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// Render users page
exports.index = async (req, res, next) => {
  try {
    const users = await exports.getAllUsers();
    res.render("users", { users }); // users.ejs must exist in your views folder
  } catch (err) {
    next(err);
  }
};
