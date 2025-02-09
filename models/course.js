const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/*
    instruction: setup the course schema according to the following requirements:
    - `title`: (String, required)
    - `instructor`: (ObjectId, ref: 'Instructor', required)
    - `startDate`: (Date)
    - `endDate`: (Date)
    - `subject`: (String)
    - `description`: (String)
    - `enrollmentCount`: (Number, default: 0) - The number of students enrolled
*/


const courseSchema = new Schema({
  title: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  subject: { type: String },
  description: { type: String },
  enrollmentCount: { type: Number, default: 0 }
});

// Create the Course model
const Course = model('Course', courseSchema);

module.exports = Course;



