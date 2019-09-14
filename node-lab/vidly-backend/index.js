const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.log(
    "FATAL error, jwtPrivateKey env var is not defined... run export vidly_jwtPrivateKey=value"
  );
  process.exit(1);
}

const app = express();
// Mongoose
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Couldn't connect to MongoDB", err));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello from Vidly");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
