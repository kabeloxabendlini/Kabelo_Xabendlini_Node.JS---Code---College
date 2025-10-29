"use strict";

const mongoose = require("mongoose");

// Define schema
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
}, {
  timestamps: true
});

// Virtual field for full name (optional)
subscriberSchema.virtual("fullName").get(function () {
  return this.name;
});

// Export the model correctly ✅
module.exports = mongoose.model("Subscriber", subscriberSchema);
