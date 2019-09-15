const mongoose = require("mongoose");
const winston = require("winston");
// Mongoose
module.exports = function() {
  mongoose
    .connect("mongodb://localhost/playground")
    .then(() => {
      console.log("Connected to MongoDB");
      winston.info("Connected to MongoDB...");
    })
    .catch(err => {
      console.log("Couldn't connect to MongoDB", err);
      process.exit(1);
    });
};
