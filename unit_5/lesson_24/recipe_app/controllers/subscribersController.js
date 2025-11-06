"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {
  index: async (req, res, next) => {
    try {
      const subscribers = await Subscriber.find();
      res.locals.subscribers = subscribers;
      next();
    } catch (err) { next(err); }
  },
  indexView: (req, res) => res.render("subscribers/index"),
  new: (req, res) => res.render("subscribers/new"),
  create: async (req, res, next) => {
    try {
      const subscriber = new Subscriber(req.body);
      await subscriber.save();
      req.flash("success", "Subscriber created!");
      res.locals.redirect = "/subscribers";
      next();
    } catch (err) {
      req.flash("error", err.message);
      res.locals.redirect = "/subscribers/new";
      next();
    }
  },
  show: async (req, res, next) => {
    try {
      const subscriber = await Subscriber.findById(req.params.id);
      res.locals.subscriber = subscriber;
      next();
    } catch (err) { next(err); }
  },
  showView: (req, res) => res.render("subscribers/show"),
  edit: async (req, res, next) => {
    try {
      const subscriber = await Subscriber.findById(req.params.id);
      res.render("subscribers/edit", { subscriber });
    } catch (err) { next(err); }
  },
  update: async (req, res, next) => {
    try {
      await Subscriber.findByIdAndUpdate(req.params.id, req.body);
      res.locals.redirect = `/subscribers/${req.params.id}`;
      next();
    } catch (err) { next(err); }
  },
  delete: async (req, res, next) => {
    try {
      await Subscriber.findByIdAndRemove(req.params.id);
      res.locals.redirect = "/subscribers";
      next();
    } catch (err) { next(err); }
  },
  saveSubscriber: async (req, res, next) => {
    try {
      const subscriber = new Subscriber(req.body);
      await subscriber.save();
      req.flash("success", "Thanks for subscribing!");
      res.locals.redirect = "/";
      next();
    } catch (err) {
      req.flash("error", err.message);
      res.locals.redirect = "/";
      next();
    }
  },
  redirectView: (req, res, next) => {
    if (res.locals.redirect) res.redirect(res.locals.redirect);
    else next();
  }
};
