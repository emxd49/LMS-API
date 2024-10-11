const asyncHandler = require("express-async-handler");
const courseService = require("../services/courseService");

const getCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.getCourses();
  res.status(200).json(courses);
});
const getCourseByID = asyncHandler(async (req, res) => {
  const courseID = req.params.id;
  const course = await courseService.getCourseByID(courseID);
  res.status(200).json(course);
});

const addCourse = asyncHandler(async (req, res) => {
  const { courseTitle, courseType, description, duration, created_date } =
    req.body;
  if (
    !courseTitle ||
    !courseType ||
    !gender ||
    !description ||
    !duration ||
    !created_date
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const createdCourse = await courseService.addCourse({
    courseTitle: courseTitle,
    courseType: courseType,
    description: description,
    duration: duration,
    created_date: created_date,
  });
  res.status(200).json(createdCourse);
});

const updateCourseByID = asyncHandler(async (req, res) => {
  const { courseTitle, courseType, description, duration, created_date } =
    req.body;
  if (
    !courseTitle ||
    !courseType ||
    !gender ||
    !description ||
    !duration ||
    !created_date
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const courseID = req.params.id;
  const updatedCourse = await courseService.updateCourse(courseID, {
    courseTitle: courseTitle,
    courseType: courseType,
    description: description,
    duration: duration,
    created_date: created_date,
  });
  res.status(200).json(updatedCourse);
});

const deleteCourseByID = asyncHandler(async (req, res) => {
  const courseID = req.params.id;
  const deletedCourse = await courseService.deleteCourseByID(courseID);
  res.status(200).json(deletedCourse);
});

module.exports = {
  getCourses,
  getCourseByID,
  addCourse,
  updateCourseByID,
  deleteCourseByID,
};
