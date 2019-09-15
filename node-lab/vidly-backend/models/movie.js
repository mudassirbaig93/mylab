const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");
Joi.objectId = require("joi-objectid")(Joi);

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: { type: genreSchema, required: true }, // using object embedding, can use object referencing as well
  numberInStock: {
    type: Number,
    required: true,
    min: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0
  }
});
const Movie = mongoose.model("Movie", movieSchema);

validateMoive = movie => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0)
  };
  return Joi.validate(movie, schema);
};

module.exports.Movie = Movie;
module.exports.validate = validateMoive;
