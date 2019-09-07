const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name // used express.json middleware to parse body in json
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));
  //   let course = courses.filter(c => {
  //     return c.id === parseInt(req.params.id);
  //   });
  if (!course) res.status(404).send("Course not found");
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //Lookup the course
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course not found");
    return;
  }

  // Validate
  const result = validateCourse(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //Lookup the course
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course not found");
    return;
  }

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
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

validateCourse = course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
};
