const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const workoutSeed = require("./seeders/seed");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// import the routes
require("./routes/html")(app);
require("./routes/api")(app);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


// seed files -- uncomment if first time running

// db.Day.deleteMany({})
//   .then(() => db.Day.collection.insertMany(workoutSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
