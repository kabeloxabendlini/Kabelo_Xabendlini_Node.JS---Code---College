"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// ✅ Define and register the Mongoose model properly
const subscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number,
});

// Create the model
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // recommended for stability
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB using Mongoose!");
});

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Create and save documents correctly
const subscriber1 = new Subscriber({
  name: "Kabelo Xabendlini",
  email: "kabeloxabendlini@gmail.com",
});
subscriber1.save((error, savedDocument) => {
  if (error) console.error(error);
  else console.log("Saved subscriber1:", savedDocument);
});

// ✅ .create() should match schema fields (no `note` field exists)
Subscriber.create(
  {
    name: "Kabelo Xabendlini",
    email: "kabeloxabendlini385@gmail.com",
    zipCode: 12345,
  },
  (error, savedDocument) => {
    if (error) console.error(error);
    else console.log("Saved Kabelo:", savedDocument);
  }
);

// ✅ Query example
Subscriber.findOne({ name: "Kabelo Xabendlini" })
  .where("email").regex(/Xabendlini/)
  .exec((error, data) => {
    if (error) console.error(error);
    else if (data) console.log("Found subscriber:", data.name);
    else console.log("No matching subscriber found.");
  });

// ✅ Express configuration
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
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

// ✅ Error handlers (must be after routes)
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

// ✅ Start server
app.listen(app.get("port"), () => {
  console.log(`🚀 Server running at http://localhost:${app.get("port")}`);
});
