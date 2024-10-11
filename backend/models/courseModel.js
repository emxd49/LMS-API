const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  courseTitle: {
    type: String,
    required: [true, "courseTitle is required"],
    unique: [true, "title is to be unique"],
  },
  courseType: {
    type: String,
    required: [true, "courseType is required"],
  },
  lessons: {
    type: [],
    // required: [true, "lessons is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  duration: {
    type: Number,
    required: [true, "duration is required"],
  },
  created_date: {
    type: Date,
    required: [true, "created date is required"],
  },
});

module.exports = mongoose.model("course", courseSchema);
