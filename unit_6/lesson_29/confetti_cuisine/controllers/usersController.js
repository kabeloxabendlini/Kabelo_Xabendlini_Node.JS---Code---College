"use strict";

const User = require("../models/user");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

// Helper function
const getUserParams = (body) => ({
  name: {
    first: body.first,
    last: body.last
  },
  email: body.email,
  password: body.password,
  zipCode: body.zipCode
});

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find();
      res.locals.users = users;
      next();
    } catch (error) {
      console.error(`Error fetching users: ${error.message}`);
      next(error);
    }
  },

  indexView: (req, res) => {
    res.render("users/index");
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: async (req, res, next) => {
    try {
      if (req.skip) return next();

      const newUser = new User(getUserParams(req.body));
      const user = await User.register(newUser, req.body.password);

      req.flash("success", `${user.fullName}'s account created successfully!`);
      res.locals.redirect = "/users";
      next();
    } catch (e) {
      req.flash("error", `Failed to create user account because: ${e.message}.`);
      res.locals.redirect = "/users/new";
      next();
    }
  },

  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) return res.redirect(redirectPath);
    next();
  },

  show: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.locals.user = user;
      next();
    } catch (error) {
      console.error(`Error fetching user by ID: ${error.message}`);
      next(error);
    }
  },

  showView: (req, res) => {
    res.render("users/show");
  },

  edit: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.render("users/edit", { user });
    } catch (error) {
      console.error(`Error fetching user by ID: ${error.message}`);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const userParams = getUserParams(req.body);
      const user = await User.findByIdAndUpdate(req.params.id, { $set: userParams });
      res.locals.redirect = `/users/${user._id}`;
      res.locals.user = user;
      next();
    } catch (error) {
      console.error(`Error updating user by ID: ${error.message}`);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.locals.redirect = "/users";
      next();
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      next();
    }
  },

  login: (req, res) => {
    res.render("users/login");
  },

  validate: [
    body("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
    body("zipCode")
      .isInt().withMessage("Zip code must be a number")
      .isLength({ min: 5, max: 5 }).withMessage("Zip code must be 5 digits"),
    body("password").notEmpty().withMessage("Password cannot be empty"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = errors.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
      }
      next();
    }
  ],

  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),

  logout: (req, res, next) => {
    req.logout(() => {
      req.flash("success", "You have been logged out!");
      res.locals.redirect = "/";
      next();
    });
  }
};
