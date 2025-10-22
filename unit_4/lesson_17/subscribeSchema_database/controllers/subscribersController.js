"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {
  // Get all subscribers
  getAllSubscribers: async (req, res, next) => {
    try {
      const subscribers = await Subscriber.find({});
      req.data = subscribers;
      next();
    } catch (error) {
      console.error("❌ Error fetching subscribers:", error);
      res.status(500).send("Error fetching subscribers.");
    }
  },

  // Show contact form
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  // Save new subscriber
  saveSubscriber: async (req, res) => {
    try {
      const newSubscriber = await Subscriber.create({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode,
      });
      console.log("💾 New subscriber saved:", newSubscriber);
      res.render("thankyou");
    } catch (error) {
      console.error("❌ Error saving subscriber:", error);
      res.status(500).send("Error saving subscriber.");
    }
  },
};
