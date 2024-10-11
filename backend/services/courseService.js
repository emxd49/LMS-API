const courseModel = require("../models/courseModel");
const asyncHandler = require("express-async-handler");
const { AppError } = require("../utils/appError");

const getCourses = asyncHandler(async () => {
  const courses = await courseModel.find();
  return courses;
});

const getCourseByID = asyncHandler(async (id) => {
  const course = await courseModel.findById(id);
  return course;
});

const addCourse = asyncHandler(async (course) => {
  const newCourse = await courseModel.create(course);
  return newCourse;
});

const updateCourse = asyncHandler(async (id, course) => {
  const updateCourse = await courseModel.findByIdAndUpdate(id, course, {
    new: true,
  });
  return updateCourse;
});

const deleteCourseByID = asyncHandler(async (id) => {
  const course = await courseModel.findById(id);
  if (!course) {
    throw new AppError(404, `No course found by ID:${id}`);
  }
  const deletedCourse = await courseModel.findByIdAndDelete(req.params.id);
  return deletedCourse
});

module.exports = {
  getCourses,
  getCourseByID,
  addCourse,
  updateCourse,
  deleteCourseByID,
};
