"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// ✅ Define schema and model
const subscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number,
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/recipe_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Use an async function to handle database operations
(async () => {
  try {
    // Create and save a new subscriber
    const subscriber1 = new Subscriber({
      name: "Kabelo Xabendlini",
      email: "kabeloxabendlini@gmail.com",
      zipCode: 12345,
    });

    const savedSubscriber1 = await subscriber1.save();
    console.log("💾 Saved subscriber1:", savedSubscriber1);

    // Alternative: Use .create() (no callback)
    const savedKabelo = await Subscriber.create({
      name: "Kabelo Xabendlini",
      email: "kabeloxabendlini385@gmail.com",
      zipCode: 12345,
    });
    console.log("💾 Saved Kabelo:", savedKabelo);

    // Query example using await
    const foundSubscriber = await Subscriber.findOne({ name: "Kabelo Xabendlini" })
      .where("email")
      .regex(/Xabendlini/);

    if (foundSubscriber) {
      console.log("🔎 Found subscriber:", foundSubscriber.name);
    } else {
      console.log("⚠️ No matching subscriber found.");
    }
  } catch (error) {
    console.error("❌ Database operation error:", error);
  }
})();

// ✅ Express configuration
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(homeController.logRequestPaths);

// ✅ Routes
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log("Body:", req.body);
  console.log("Query:", req.query);
  res.send("POST Successful!");
});

// ✅ Error handlers (after routes)
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// ✅ Start server
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});