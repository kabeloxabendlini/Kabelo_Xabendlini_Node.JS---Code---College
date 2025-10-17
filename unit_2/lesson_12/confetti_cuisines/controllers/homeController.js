"use strict";
//courses object
var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50.75
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25.55
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10.35
  }
];

//callback functions
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
    //refers to courses.ejs
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
