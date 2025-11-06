"use strict";

const Course = require("../models/course");

module.exports = {
  index: async (req, res, next) => {
    try {
      const courses = await Course.find();
      res.locals.courses = courses;
      next();
    } catch (err) { next(err); }
  },
  indexView: (req, res) => res.render("courses/index"),
  new: (req, res) => res.render("courses/new"),
  create: async (req, res, next) => {
    try {
      const course = new Course(req.body);
      await course.save();
      req.flash("success", "Course created!");
      res.locals.redirect = "/courses";
      next();
    } catch (err) {
      req.flash("error", err.message);
      res.locals.redirect = "/courses/new";
      next();
    }
  },
  show: async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id);
      res.locals.course = course;
      next();
    } catch (err) { next(err); }
  },
  showView: (req, res) => res.render("courses/show"),
  edit: async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id);
      res.render("courses/edit", { course });
    } catch (err) { next(err); }
  },
  update: async (req, res, next) => {
    try {
      await Course.findByIdAndUpdate(req.params.id, req.body);
      res.locals.redirect = `/courses/${req.params.id}`;
      next();
    } catch (err) { next(err); }
  },
  delete: async (req, res, next) => {
    try {
      await Course.findByIdAndRemove(req.params.id);
      res.locals.redirect = "/courses";
      next();
    } catch (err) { next(err); }
  },
  redirectView: (req, res, next) => {
    if (res.locals.redirect) res.redirect(res.locals.redirect);
    else next();
  }
};
