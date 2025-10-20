"use strict";

const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");

const { MongoClient } = require("mongodb");
const dbURL = "mongodb://localhost:27017";
const dbName = "recipe_db";

let db; // global reference for routes

// ----- Connect to MongoDB -----
async function connectDB() {
  try {
    const client = await MongoClient.connect(dbURL);
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");

    // Insert a sample contact
    const result = await db.collection("contacts").insertOne({
      name: "Kabelo Xabendlini",
      email: "kabeloxabendlini385@gmail.com",
      note: "Seed of Abraham!"
    });
    console.log("Inserted contact:", result.insertedId);

    // Fetch all contacts to verify
    const contacts = await db.collection("contacts").find().toArray();
    console.log("All contacts:", contacts);

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectDB();

// ----- Express setup -----
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
});

// ----- Routes -----
app.get("/items/:vegetable", (req, res) => homeController.sendReqParam(req, res, db));

app.post("/", (req, res) => homeController.sendPost(req, res, db));

app.get("/name/:myName", (req, res) => homeController.respondWithName(req, res));

// ----- Start server -----
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});