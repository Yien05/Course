const express = require("express");
const router = express.Router();

// instruction: import the book model
const Instructor = require("../models/instructor");

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id

router.get("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// instruction: setup POST /: Add a new instructor

router.post("/", async (req, res) => {
  const { name, qualification, profile, coursesTaught } = req.body;

  try {
    const instructor = new Instructor({
      name,
      qualification,
      profile,
      coursesTaught: coursesTaught || 0, // Default to 0 if not provided
    });

    const savedInstructor = await instructor.save();
    res.status(201).json(savedInstructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// instruction: setup PUT /:id: Update a instructor by its _id

router.put("/:id", async (req, res) => {
  const { name, qualification, profile, coursesTaught } = req.body;

  try {
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      { name, qualification, profile, coursesTaught },
      { new: true }
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json(updatedInstructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// instruction: setup DELETE /:id: Delete a instructor by its _id
router.delete("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    res.json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// instruction: export the router
module.exports = router;
