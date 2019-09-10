const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));
  //   let course = courses.filter(c => {
  //     return c.id === parseInt(req.params.id);
  //   });
  if (!course) res.status(404).send("Course not found");
  res.send(course);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

validateCourse = course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
};

module.exports = router;
