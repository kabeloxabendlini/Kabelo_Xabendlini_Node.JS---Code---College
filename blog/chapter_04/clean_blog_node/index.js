const express = require("express");
const app = new express();
const path = require("path");

// ---------- Chapter04 ------------
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));
// ---------------------------------

app.use(express.static("public"));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

// ---------- Chapter04 ------------
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post", (req, res) => {
  res.render("post");
});
// ---------------------------------
