const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //throw new Error("Error occured asdasd");
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (ex) {
    next(ex);
  }
});

// auth is a middleware fn, so we are protecting this route with middleware function
// In other words, only authenticated user will be able to use this route
router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
});

// Allow delete only to authorized and admin users
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  res.send(genre);
});

module.exports = router;
