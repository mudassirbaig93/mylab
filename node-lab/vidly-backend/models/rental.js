const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const rentalSchema = new mongoose.Schema({
  //not reusing customer schema b/c we want only few properties of customer in this collection
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, minlength: 5, maxlength: 50 },
      isGold: { type: Boolean, default: false },
      phone: { type: String, required: true, minlength: 5 }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
      }
    }),
    required: true
  },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 }
});
const Rental = mongoose.model("Rental", rentalSchema);

validateRental = rental => {
  console.log(rental);
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
};

module.exports.Rental = Rental;
module.exports.validate = validateRental;
