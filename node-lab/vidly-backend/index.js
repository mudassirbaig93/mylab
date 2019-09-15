const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
require("./startup/logging")();
require("./startup/db")();
require("./startup/config")();
require("./startup/routes")(app); // startup module is calling a function so we are just calling it here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
