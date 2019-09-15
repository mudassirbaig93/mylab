const genres = require("../routes/genres");
const movies = require("../routes/movies");
const customers = require("../routes/customers");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const express = require("express");

module.exports = function(app) {
  app.use(express.json());

  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.get("/", (req, res) => {
    res.send("Hello from Vidly");
  });

  // This needs to be the last middleware, only to handle errors
  app.use(error);
};
