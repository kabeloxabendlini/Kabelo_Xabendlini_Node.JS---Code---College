"use strict"; 
// Enables strict mode — helps catch common coding errors and enforces safer JavaScript practices.

const express = require("express"); 
// Imports the Express framework for building the web server.

const app = express(); 
// Creates an instance of an Express application.

const layouts = require("express-ejs-layouts"); 
// Imports the EJS layouts middleware for managing reusable layouts in views.

const homeController = require("./controllers/homeController"); 
// Imports your custom controller that handles route logic.

const { MongoClient } = require("mongodb"); 
// Imports the MongoDB client to connect and interact with a MongoDB database.

const dbURL = "mongodb://localhost:27017"; 
// Connection string for the local MongoDB server.

const dbName = "recipe_db"; 
// The name of the database to use.

let db; 
// Global variable to store a reference to the connected MongoDB database.

// ==============================
// 🔗 Connect to MongoDB
// ==============================
async function connectDB() {
  try {
    // Connects to the MongoDB server.
    const client = await MongoClient.connect(dbURL);

    // Selects the database by name.
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");

    // Inserts a sample document into the 'contacts' collection.
    const result = await db.collection("contacts").insertOne({
      name: "Kabelo Xabendlini",
      email: "kabeloxabendlini385@gmail.com",
      note: "Seed of Abraham!"
    });
    console.log("Inserted contact:", result.insertedId);

    // Retrieves and logs all documents in the 'contacts' collection.
    const contacts = await db.collection("contacts").find().toArray();
    console.log("All contacts:", contacts);

  } catch (err) {
    // Logs an error message if MongoDB connection fails.
    console.error("❌ MongoDB connection error:", err);
  }
}

// Call the async database connection function.
connectDB();

// ==============================
// ⚙️ Express App Configuration
// ==============================
app.set("port", process.env.PORT || 3000); 
// Sets the port number for the server (environment variable or 3000 by default).

app.set("view engine", "ejs"); 
// Sets EJS as the templating engine for rendering dynamic HTML views.

app.use(layouts); 
// Enables EJS layout support.

app.use(express.urlencoded({ extended: false })); 
// Parses URL-encoded form data (for POST requests).

app.use(express.json()); 
// Parses incoming JSON data from requests.

// ==============================
// 🧾 Middleware for Logging
// ==============================
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`); 
  // Logs each incoming request URL to the console.
  next(); 
  // Passes control to the next middleware or route handler.
});

// ==============================
// 🚏 Routes
// ==============================

// Handles GET requests with a dynamic "vegetable" parameter.
app.get("/items/:vegetable", (req, res) => homeController.sendReqParam(req, res, db));

// Handles POST requests to the root URL ("/").
app.post("/", (req, res) => homeController.sendPost(req, res, db));

// Handles GET requests with a dynamic "myName" parameter.
app.get("/name/:myName", (req, res) => homeController.respondWithName(req, res));

// ==============================
// 🚀 Start Server
// ==============================
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
  // Logs a message confirming the server is running and which port it uses.
});