"use strict";

const router = require("express").Router();
const userRoutes = require("./userRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const courseRoutes = require("./courseRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./apiRoutes");
// routes/index.js
const express = require('express');

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);
// your routes here
router.get('/', (req, res) => res.render('home'));

module.exports = router; // ✅ must export the router

module.exports = router;
