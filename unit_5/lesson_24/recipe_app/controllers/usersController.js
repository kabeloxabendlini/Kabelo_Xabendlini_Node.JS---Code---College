"use strict";

const User = require("../models/user");
const passport = require("passport");

// Helper to get user params
const getUserParams = (body) => ({
  name: { first: body.first, last: body.last },
  email: body.email,
  zipCode: body.zipCode,
  password: body.password
});

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find();
      res.locals.users = users;
      next();
    } catch (err) {
      next(err);
    }
  },
  indexView: (req, res) => res.render("users/index"),
  new: (req, res) => res.render("users/new"),
  create: (req, res, next) => {
    if (req.skip) return next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (err, user) => {
      if (user) {
        req.flash("success", `${user.fullName} created successfully!`);
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash("error", `Failed to create user: ${err.message}`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    if (res.locals.redirect) res.redirect(res.locals.redirect);
    else next();
  },
  show: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.locals.user = user;
      next();
    } catch (err) { next(err); }
  },
  showView: (req, res) => res.render("users/show"),
  edit: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.render("users/edit", { user });
    } catch (err) { next(err); }
  },
  update: async (req, res, next) => {
    const userParams = getUserParams(req.body);
    try {
      await User.findByIdAndUpdate(req.params.id, { $set: userParams });
      res.locals.redirect = `/users/${req.params.id}`;
      next();
    } catch (err) { next(err); }
  },
  delete: async (req, res, next) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.locals.redirect = "/users";
      next();
    } catch (err) { next(err); }
  },
  login: (req, res) => res.render("users/login"),
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),
  logout: (req, res, next) => {
    req.logout(() => {
      req.flash("success", "Logged out!");
      res.locals.redirect = "/";
      next();
    });
  },
  validate: (req, res, next) => {
    const { email, zipCode, password } = req.body;
    const errors = [];
    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    if (!zipCode || zipCode.toString().length !== 5) errors.push("Zip code must be 5 digits");
    if (errors.length > 0) {
      req.skip = true;
      req.flash("error", errors.join(" and "));
      res.locals.redirect = "/users/new";
    }
    next();
  }
};
