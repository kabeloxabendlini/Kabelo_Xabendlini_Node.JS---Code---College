"use strict";
const User = require("../models/user");

exports.index = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users/index", { users });
  } catch (error) {
    next(error);
  }
};

exports.new = (req, res) => {
  res.render("users/new");
};

exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/users");
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res) => {
  res.render("users/login");
};

exports.authenticate = (req, res) => {
  res.send("User authentication logic coming soon!");
};
