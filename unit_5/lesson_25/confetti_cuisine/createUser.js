"use strict";

const mongoose = require("mongoose");
const User = require("./models/user"); // adjust path if needed (e.g. ../models/user)

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("✅ Connected to MongoDB");

  try {
    // optional: clear old test users with same email
    await User.deleteMany({ email: "kabeloxabendlini385@gmail.com" });

    const newUser = new User({
      name: { first: "Kabelo", last: "Xabendlini" },
      email: "kabeloxabendlini385@gmail.com",
      zipCode: 12345,
    });

    await User.register(newUser, "Kabelo385@06");
    console.log("✅ User created successfully!");
    console.log("Email: kabeloxabendlini385@gmail.com");
    console.log("Password: Kabelo385@06");
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
  } finally {
    mongoose.connection.close();
  }
});
