"use strict";

// =======================
// Module Imports
// =======================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");

// =======================
// Routes
// =======================
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/userRoutes");

// =======================
// Middleware
// =======================
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json()); // parse JSON
app.use(cookieParser()); // cookies
app.use(express.static(path.join(__dirname, "public"))); // static files

// =======================
// View Engine
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// =======================
// Routes Middleware
// =======================
app.use("/", indexRoutes); // ✅ make sure indexRoutes exports router
app.use("/users", userRoutes); // ✅ make sure userRoutes exports router

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect("mongodb://127.0.0.1:27017/recipe_app")
  .then(() => console.log("✅ Successfully connected to MongoDB using Mongoose!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =======================
// Error handling for 404
// =======================
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// =======================
// Start Server
// =======================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
