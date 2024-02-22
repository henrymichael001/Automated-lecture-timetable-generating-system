import { Router } from "express";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
  getAllLectureHalls,
  getLectureHallById,
  createLectureHall,
  updateLectureHall,
  deleteLectureHall,
  getDashboardData,
  generateTimetableController,
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  updateUser,
} from "../controllers/api.controllers";
import { signinUser } from "../controllers/auth.controller";

const router = Router();

// Department routes
router.get("/departments", getAllDepartments);
router.get("/departments/:id", getDepartmentById);
router.post("/departments", createDepartment);
router.put("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

// Course routes
router.get("/courses", getAllCourses);
router.get("/courses/get-timetable", generateTimetableController);
router.get("/courses/:id", getCourseById);
router.post("/courses", createCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

// Lecturer routes
router.get("/lecturers", getAllLecturers);
router.get("/lecturers/:id", getLecturerById);
router.post("/lecturers", createLecturer);
router.put("/lecturers/:id", updateLecturer);
router.delete("/lecturers/:id", deleteLecturer);

// LectureHall routes
router.get("/lecturehalls", getAllLectureHalls);
router.get("/lecturehalls/:id", getLectureHallById);
router.post("/lecturehalls", createLectureHall);
router.put("/lecturehalls/:id", updateLectureHall);
router.delete("/lecturehalls/:id", deleteLectureHall);

// LectureHall routes
router.get("/reports", getAllReports);
router.get("/reports/:id", getReportById);
router.post("/reports", createReport);
router.put("/reports/:id", updateReport);
router.delete("/reports/:id", deleteReport);

// Auth
router.post("/login", signinUser);
router.post("/login-update", updateUser);
router.get("/dashboard-data", getDashboardData);
router.get("/generate-timetable", generateTimetableController);

export default router;
