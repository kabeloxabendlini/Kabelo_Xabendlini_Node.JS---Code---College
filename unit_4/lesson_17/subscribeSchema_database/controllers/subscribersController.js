"use strict";

const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({})
    .then((subscribers) => {
      req.data = subscribers;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching subscribers: ${error.message}`);
      next(error);
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

exports.saveSubscriber = (req, res, next) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
  });

  newSubscriber
    .save()
    .then(() => {
      res.render("thanks");
    })
    .catch((error) => {
      console.log(`Error saving subscriber: ${error.message}`);
      next(error);
    });
};