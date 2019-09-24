const express = require("express");
const courses = require("./routes/courses");
const Joi = require("joi");
const logger = require("./middleware/logger");
const auth = require("./middleware/authentication");
const morgan = require("morgan");
const config = require("config");

const db = require("./models");

// require('debug') returns a function, to see messages with below debugger we will have to set environment variable DEBUG=app:startup
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const app = express();

// for templating engine
app.set("view engine", "pug"); // express will internally require pug
app.set("views", "./views"); // it will look in the mentioned folder for templates

// Middleware function to parse req body as json at the front of request processing pipeline.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled ...");
}

// Db work ...
dbDebugger("Connected to the database");

// Load configuration, It checks which config file to use by checking NODE_ENV environment variable.
// can set environment variables like NODE_ENV=development
console.log("Application Name: " + config.get("name"));
console.log("Mail Name: " + config.get("mail.host"));
try {
  console.log("Mail Password: " + config.get("mail.password"));
} catch (e) {
  console.log("Failed to read environment variable");
}

// We can also implement middleware functions of our own
app.use(logger);

// Similarly
app.use(auth);

// For any route that starts with /api/courses use courses router
app.use("/api/courses", courses);

app.get("/", (req, res) => {
  //res.send("Hello World");
  // now lets end template instead
  res.render("index", { title: "My Express App", message: "Hello" });
});

// api/posts/2018/1?SortBy=name
app.get("/api/posts/:year/:month", (req, res) => {
  //res.send(req.params);
  res.send(req.query);
});

// better not to hard code the pot, instead use PORT environment
// variable, accessible via process i.e. global object
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
