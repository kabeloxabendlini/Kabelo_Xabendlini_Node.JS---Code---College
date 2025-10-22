"use strict";

const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

    owercase: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  }
});

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code:
${this.zipCode}`;
};
subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")

ind({zipCode: this.zipCode})
    .exec();
};

module.exports = mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

