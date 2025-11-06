"use strict";

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Subscriber = require("./subscriber");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    first: { type: String, trim: true },
    last: { type: String, trim: true }
  },
  email: { type: String, required: true, lowercase: true, unique: true },
  zipCode: { type: Number, min: [1000, "Zip code too short"], max: 99999 },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" }
}, { timestamps: true });

// Virtual full name
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// Connect user to subscriber
userSchema.pre("save", async function (next) {
  if (!this.subscribedAccount) {
    try {
      const subscriber = await Subscriber.findOne({ email: this.email });
      this.subscribedAccount = subscriber;
      next();
    } catch (err) {
      console.log(`Error connecting subscriber: ${err.message}`);
      next(err);
    }
  } else next();
});

// Passport plugin
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
