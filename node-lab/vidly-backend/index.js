const express = require("express");
const Joi = require("joi");
const app = express();

// Mongoose
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Couldn't connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema); // Course is now a class, and we create objects for it

async function createCourse() {
  const course = new Course({
    name: "NodeJS test",
    author: "Mudassir",
    tags: ["nodes", "backend"],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}
//createCourse();

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}
console.log("Calling get courses");
getCourses();

async function updateCourses(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.set({
    isPublished: true,
    author: "Mudassir"
  });
  const result = await course.save();
  console.log(result);
}
updateCourses("5d7921412f5baf0e3ce4a15d");

// Another method - direct update
async function updateCourses2(id) {
  const result = await Course.update(
    { _id: id },
    { $set: { author: "Mudassir Ali" } }
  );
  console.log(result);
}

async function removeCourses(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

const genres = require("./routes/genres");

app.use(express.json());

app.use("/api/genres", genres);

app.get("/", (req, res) => {
  res.send("Hello from Vidly");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
