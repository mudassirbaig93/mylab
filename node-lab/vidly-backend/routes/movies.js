const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

// auth is a middleware fn, so we are protecting this route with middleware function
// In other words, only authenticated user will be able to use this route
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if we genreId is correct
  let genre = null;
  try {
    genre = await Genre.findById(req.body.genreId);
  } catch (ex) {
    return res.status(400).send("Invalid genreId");
  }
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  movie = await movie.save();
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("movie not found");
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );
  if (!movie) return res.status(404).send("movie not found");

  res.send(movie);
});

// Allow delete only to authorized and admin users
router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send("movie not found");
  res.send(movie);
});

module.exports = router;
