const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

  mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.connection;
var contacts = [
  {
    name: "Kabelo Xabendlini",
    email: "kabeloxabendlini385@gmail.com",
    zipCode: 42753
  },
  {
    name: "Thozamile Xabendlini",
    email: "thozamilexabendlini@gmail.com",
    zipCode: 42753
  },
  {
    name: "Tamiya Xabendlini",
    email: "tamiyaxabendli@gmail.com",
    zipCode: 42753
  }
];
Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });
var commands = [];
contacts.forEach((c) => {
    commands.push(Subscriber.create({
name: c.name,
email: c.email
    }));
});
Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {

console.log(`ERROR: ${error}`);
  });