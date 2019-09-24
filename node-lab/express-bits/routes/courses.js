const express = require("express");
const router = express.Router();
const Joi = require("joi");

const db = require("../models");

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" }
];

router.get("/", async (req, res) => {
  //res.send(courses);
  const courses = await db.Courses.findAll();
  res.send(courses);
});

router.post("/", async (req, res) => {
  const result = validateCourse(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    name: req.body.name, // used express.json middleware to parse body in json
    createdAt: new Date(),
    updatedAt: new Date()
  };
  //courses.push(course);
  try {
    const n_course = await db.Courses.create(course);
    res.send(n_course);
  } catch (ex) {
    res.status(400).send("Failed to add course");
  }
});

router.get("/:id", async (req, res) => {
  //let course = courses.find(c => c.id === parseInt(req.params.id));
  let course = await db.Courses.findByPk(parseInt(req.params.id));
  if (!course) res.status(404).send("Course not found");
  res.send(course);
});

router.put("/:id", async (req, res) => {
  //Lookup the course
  let course = await db.Courses.findByPk(parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");

  // Validate
  const result = validateCourse(req.body);
  const { error } = result;
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update
  course = await db.Courses.update(
    {
      name: req.body.name,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { where: { id: course.id } }
  );
  res.send(course);
});

router.delete("/:id", async (req, res) => {
  //Lookup the course
  let course = await db.Courses.findByPk(parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");

  // Delete
  //const index = courses.indexOf(course);
  //courses.splice(index, 1);
  await db.Courses.destroy({ where: { id: course.id } });

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
