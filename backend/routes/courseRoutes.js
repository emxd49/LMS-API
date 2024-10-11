const express = require("express");
const {
  getCourseByID,
  addCourse,
  getCourses,
  updateCourseByID,
  deleteCourseByID,
} = require("../controllers/courseController");

const courseRouter = express.Router();

courseRouter.route("/").get(getCourses).post(addCourse);
courseRouter
  .route("/:id")
  .get(getCourseByID)
  .put(updateCourseByID)
  .delete(deleteCourseByID);

module.exports = { courseRouter };
