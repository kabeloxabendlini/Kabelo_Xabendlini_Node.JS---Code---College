"use strict";

const Subscriber = require("../models/subscriber");

const getSubscriberParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    zipCode: parseInt(body.zipCode),
  };
};

module.exports = {
  index: (req, res, next) => {
    Subscriber.find()
      .then((subscribers) => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscribers: ${error.message}`);
        req.flash("error", "Could not fetch subscribers");
        res.locals.subscribers = [];
        next();
      });
  },

  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  new: (req, res) => {
    res.render("subscribers/new");
  },

  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then((subscriber) => {
        req.flash("success", `${subscriber.name} has been added!`);
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error saving subscriber: ${error.message}`);
        req.flash(
          "error",
          `Failed to create subscriber: ${error.message}`
        );
        res.locals.redirect = "/subscribers/new";
        next(); // Don't pass the error here, or it triggers 500
      });
  },

  redirectView: (req, res, next) => {
    if (res.locals.redirect) res.redirect(res.locals.redirect);
    else next();
  },

  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        req.flash("error", "Subscriber not found");
        res.locals.redirect = "/subscribers";
        next();
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show");
  },

  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        if (subscriber) res.render("subscribers/edit", { subscriber });
        else {
          req.flash("error", "Subscriber not found");
          res.redirect("/subscribers");
        }
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        req.flash("error", "Error fetching subscriber");
        res.redirect("/subscribers");
      });
  },

  update: (req, res, next) => {
    let subscriberId = req.params.id;
    let subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams }, { new: true })
      .then((subscriber) => {
        if (subscriber) {
          req.flash("success", `${subscriber.name} updated successfully!`);
          res.locals.redirect = `/subscribers/${subscriberId}`;
          res.locals.subscriber = subscriber;
          next();
        } else {
          req.flash("error", "Subscriber not found");
          res.redirect("/subscribers");
        }
      })
      .catch((error) => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        req.flash("error", "Failed to update subscriber");
        res.redirect("/subscribers");
      });
  },

  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then((subscriber) => {
        if (subscriber) {
          req.flash("success", `${subscriber.name} deleted successfully!`);
        } else {
          req.flash("error", "Subscriber not found");
        }
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        req.flash("error", "Failed to delete subscriber");
        res.locals.redirect = "/subscribers";
        next();
      });
  },

  saveSubscriber: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then((subscriber) => {
        req.flash("success", `Thanks for subscribing, ${subscriber.name}!`);
        res.locals.redirect = "/";
        next();
      })
      .catch((error) => {
        console.log(`Error saving subscriber: ${error.message}`);
        req.flash("error", "Subscription failed. Please try again.");
        res.locals.redirect = "/";
        next();
      });
  },
};
