const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");
mongoose.connect(
"mongodb://0.0.0.0:27017/recipe_db",
{useNewUrlParser: true}
);
mongoose.Promise = global.Promise;

Subscriber.create({
  name: "Kabelo",
  email: "kabeloxabendlini@gmail.com",
  zipCode: "42753"
  })
  .then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));
  var subscriber;
  Subscriber.findOne({
  name: "Kabelo"
  }).then(result => {
  subscriber = result;
  console.log(subscriber.getInfo());
  });
Subscriber.create({
  name: "Kabelo",
  email: "kabeloxabendlini@gmail.com",
  zipCode: "42753"
  })
  .then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));
  var subscriber;
  Subscriber.findOne({
  name: "Kabelo"
  }).then(result => {
  subscriber = result;
  console.log(subscriber.getInfo());
  });
Subscriber.create({
  name: "Thozamile",
  email: "thozamilexabendlini@gmail.com",
  zipCode: "42753"
  })
  .then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));
  var subscriber;
  Subscriber.findOne({
  name: "Thozamile"
  }).then(result => {
  subscriber = result;
  console.log(subscriber.getInfo());
  });