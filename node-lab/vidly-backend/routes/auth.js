const { User } = require("../models/user");
const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");

const router = express.Router();
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send("Invalid email or password");

  // hashed password already has salt, so bcrypt can hash plain text in body
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = router;

// /api/users
