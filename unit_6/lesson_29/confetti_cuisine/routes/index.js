"use strict";

const express = require("express");
const router = express.Router();

// Controllers
const homeController = require("../controllers/homeController");
const usersController = require("../controllers/usersController");
const subscribersController = require("../controllers/subscribersController");
const coursesController = require("../controllers/coursesController");

// --- Home route ---
router.get("/", homeController.index, homeController.indexView);

// --- Users routes ---
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);

// --- Subscribers routes ---
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);

// --- Courses routes ---
router.get("/courses", coursesController.index, coursesController.indexView);

// --- Catch-all 404 ---
router.use((req, res) => {
  res.status(404);
  res.render("error"); // make sure 'error.ejs' exists
});

module.exports = router;
