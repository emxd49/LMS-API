const courseModel = require("../models/courseModel");
const asyncHandler = require("express-async-handler");
const { AppError } = require("../utils/appError");
const { default: mongoose } = require("mongoose");

const getCourses = asyncHandler(async () => {
  const courses = await courseModel.find();
  return courses;
});

const getCourseByID = asyncHandler(async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(400, `Invalid ID provided`);
  }
  const course = await courseModel.findById(id);
  if (!course) {
    throw new AppError(404, `No course found by ID:${id}`);
  }
  return course;
});

const addCourse = asyncHandler(async (course) => {
  const existingCourse = await courseModel.findOne({
    courseTitle: course.courseTitle,
  });
  if (existingCourse) {
    throw new AppError(
      400,
      `Course by title: ${course.courseTitle} already exists!`
    );
  }
  const newCourse = await courseModel.create(course);
  return newCourse;
});

const updateCourse = asyncHandler(async (id, course) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(400, `Invalid ID provided`);
  }
  const existingCourse = await courseModel.findById(id);
  if (!existingCourse) {
    throw new AppError(400, `Course by id ${id} does not exist!`);
  }

  const updateCourse = await courseModel.findByIdAndUpdate(id, course, {
    new: true,
  });
  return updateCourse;
});

const deleteCourseByID = asyncHandler(async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(400, `Invalid ID provided`);
  }
  const course = await courseModel.findById(id);
  if (!course) {
    throw new AppError(404, `No course found by ID:${id}`);
  }
  const deletedCourse = await courseModel.findByIdAndDelete(id);
  return deletedCourse;
});

module.exports = {
  getCourses,
  getCourseByID,
  addCourse,
  updateCourse,
  deleteCourseByID,
};
