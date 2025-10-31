const mongoose = require("mongoose");
const User = require("./models/user"); // make sure this file exists

mongoose.connect("mongodb://127.0.0.1:27017/recipe_db")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return User.create({
      name: { first: "Kabelo", last: "Xabendlini" },
      email: "kabeloxabendlini385@gmail.com",
      password: "kabelo385@06"
    });
  })
  .then(user => {
    console.log("🎉 User created:", user);
    mongoose.connection.close();
  })
  .catch(err => console.error("❌ Error:", err));
