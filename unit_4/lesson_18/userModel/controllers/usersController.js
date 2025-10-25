"use strict";

// Export an object with functions (each is a valid route handler)
exports.index = (req, res) => {
  res.send("User controller is working correctly!");
};

exports.show = (req, res) => {
  res.send("Showing a single user!");
};

exports.index = (req, res) => {
  res.send("List of users");
};

module.exports = {
  index: (req, res) => {
    User.find({})
      .then(users => {
          res.render("users/index", {
            users: users
          })
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
res.redirect("/");
});
  }
};

module.exports = {
  index: (req, res, next) => {
    User.find()
.then(users => {
res.locals.users = users;
next();
})

.catch(error => {
console.log(`Error fetching users: ${error.message}`);
next(error);
});
  },
  indexView: (req, res) => {
    res.render("users/index");
  }
};