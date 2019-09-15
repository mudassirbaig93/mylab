const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// auth is a middleware fn, so we are protecting this route with middleware function
// In other words, only authenticated user will be able to use this route
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, phone, isGold } = req.body;
  let customer = new Customer({ name: name, phone: phone, isGold: isGold });
  customer = await customer.save();
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("customer not found");
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  if (!customer) return res.status(404).send("customer not found");

  res.send(customer);
});

// Allow delete only to authorized and admin users
router.delete("/:id", [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("customer not found");
  res.send(customer);
});

module.exports = router;
