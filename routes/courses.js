const express = require("express");
const router = express.Router();

// instruction: import the course model
const Course = require("../models/Course");

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// instruction: setup POST /: Add a new course

router.post("/", async (req, res) => {
  const { title, instructor, startDate, endDate, subject, description } =
    req.body;

  try {
    const course = new Course({
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id

router.put("/:id", async (req, res) => {
  const { title, instructor, startDate, endDate, subject, description } =
    req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, instructor, startDate, endDate, subject, description },
      { new: true }
    ).populate("instructor");

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// instruction: export the router
module.exports = router;
