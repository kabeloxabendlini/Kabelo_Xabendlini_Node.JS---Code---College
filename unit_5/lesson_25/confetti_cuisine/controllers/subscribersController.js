"use strict";
const Subscriber = require("../models/subscriber");

exports.index = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find();
    res.render("subscribers/index", { subscribers });
  } catch (error) {
    next(error);
  }
};

exports.new = (req, res) => {
  res.render("subscribers/new");
};

exports.create = async (req, res, next) => {
  try {
    const subscriber = new Subscriber(req.body);
    await subscriber.save();
    res.redirect("/subscribers");
  } catch (error) {
    next(error);
  }
};
