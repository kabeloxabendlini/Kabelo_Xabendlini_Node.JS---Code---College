"use strict";

const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
});

module.exports = mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);