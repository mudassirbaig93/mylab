const mongoose = require("mongoose");

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
