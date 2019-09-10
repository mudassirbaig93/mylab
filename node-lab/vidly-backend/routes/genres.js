const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const result = validateGenre(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre not found");
    return;
  }
  res.send(genre);
});

router.put("/:id", (req, res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre not found");
    return;
  }

  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre not found");
    return;
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

validateGenre = genre => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
};

module.exports = router;
