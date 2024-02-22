import { Request, Response } from "express";
import prisma from "../lib/prisma";
import generateTimetable from "../lib/generate-timetable";
const PDFDocument = require("pdfkit-table");
import fs from "fs";

// Department Controller
export const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await prisma.department.findMany({ include: { courses: true, lecturers: true } });
  res.json(departments);
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await prisma.department.findUnique({ where: { id } });
  res.json(department);
};

export const createDepartment = async (req: Request, res: Response) => {
  const department = await prisma.department.create({ data: req.body });
  res.json(department);
};

export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await prisma.department.update({
    where: { id },
    data: req.body,
  });
  res.json(department);
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.department.delete({ where: { id } });
  res.json({ message: "Department deleted successfully" });
};

// Similar CRUD operations for Courses, Lecturers, and LectureHalls models

// Course Controller
// Lecturer Controller
// LectureHall Controller

// Course Controller
export const getAllCourses = async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany({
    include: { department: true, lecturer: true },
  });
  res.json(courses);
};

export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await prisma.course.findUnique({ where: { id } });
  res.json(course);
};

export const createCourse = async (req: Request, res: Response) => {
  console.log(req.body);
  const course = await prisma.course.create({ data: req.body });
  res.json(course);
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await prisma.course.update({ where: { id }, data: req.body });
  res.json(course);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.course.delete({ where: { id } });
  res.json({ message: "Course deleted successfully" });
};

// Lecturer Controller
export const getAllLecturers = async (req: Request, res: Response) => {
  const lecturers = await prisma.lecturer.findMany(
    { include: { department: true, courses: true } }
  );
  res.json(lecturers);
};

export const getLecturerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const lecturer = await prisma.lecturer.findUnique({ where: { id } });
  res.json(lecturer);
};

export const createLecturer = async (req: Request, res: Response) => {
  const lecturer = await prisma.lecturer.create({ data: req.body });
  res.json(lecturer);
};

export const updateLecturer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const lecturer = await prisma.lecturer.update({
    where: { id },
    data: req.body,
  });
  res.json(lecturer);
};

export const deleteLecturer = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.lecturer.delete({ where: { id } });
  res.json({ message: "Lecturer deleted successfully" });
};

// LectureHall Controller
export const getAllLectureHalls = async (req: Request, res: Response) => {
  const lectureHalls = await prisma.lectureHall.findMany();
  res.json(lectureHalls);
};

export const getLectureHallById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const lectureHall = await prisma.lectureHall.findUnique({ where: { id } });
  res.json(lectureHall);
};

export const createLectureHall = async (req: Request, res: Response) => {
  const lectureHall = await prisma.lectureHall.create({ data: req.body });
  res.json(lectureHall);
};

export const updateLectureHall = async (req: Request, res: Response) => {
  const { id } = req.params;
  const lectureHall = await prisma.lectureHall.update({
    where: { id },
    data: req.body,
  });
  res.json(lectureHall);
};

export const deleteLectureHall = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.lectureHall.delete({ where: { id } });
  res.json({ message: "Lecture Hall deleted successfully" });
};

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const courseCount = await prisma.course.count();
    const lectureHallCount = await prisma.lectureHall.count();
    const lecturerCount = await prisma.lecturer.count();
    const departmentCount = await prisma.department.count();

    return res.json({
      success: true,
      message: "Dashboard data",
      data: {
        courseCount,
        lectureHallCount,
        lecturerCount,
        departmentCount,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const generateTimetableController = async (
  req: Request,
  res: Response
) => {
  const { departmentID } = req.query;
  if (!departmentID) return res.send("Please select a department");
  try {
    const courses = await prisma.course.findMany({
      where: { departmentID: departmentID as string },
      orderBy: {
        priority: "desc",
      },
      include: {
        department: true,
        lecturer: true,
      },
    });
    const lectureHall = await prisma.lectureHall.findMany();

    if (!courses.length || !lectureHall.length) {
      return res.send("No courses or lecture halls for this department");
    }
    const timetable = generateTimetable(courses, lectureHall);

    if (!timetable.length) {
      return res.send("No timetable generated");
    }

    // init document
    let doc = new PDFDocument({ margin: 30, size: "A4" });
    // save document
    doc.pipe(res);

    // Define table properties
    const table: any = {
      title:
        (courses[0]?.department?.name || "Computer Science") + " Timetable",
      headers: [
        "Days/time",
        "8am - 9am",
        "9am - 10am",
        "10am - 11am ",
        "11am - 12pm ",
        "12pm - 1pm",
        "1pm - 2pm",
        "2pm - 3pm",
        "3pm - 4pm",
        "4pm - 5pm",
        "5pm - 6pm",
      ],
      rows: [],
    };

    timetable.forEach((day) => {
      const row = [
        day.day,
        ...Object.values(day.periods).map(
          (period: any) => {
            if (period.course.title != "Break") {
              return period.course.title + "\n(" + period.hall + ")";
            } else {
              return "Break";
            }
          }
        ),
      ];
      table.rows.push(row);
    });

    // Set font and font size for the document
    doc.font("Helvetica-Bold");
    doc.fontSize(12);

    doc.table(table).then(() => {
      // Set the response headers to indicate PDF attachment
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${table.title}.pdf"`
      );
      res.setHeader("Content-Type", "application/pdf");

      // End the PDF document
      doc.end();
    });
    // return res.json({ success: true, message: "Generated", data: timetable });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllReports = async (req: Request, res: Response) => {
  const report = await prisma.report.findMany();
  res.json(report);
}
export const getReportById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const report = await prisma.report.findUnique({ where: { id } });
  res.json(report);
}
export const createReport = async (req: Request, res: Response) => {
  const report = await prisma.report.create({ data: req.body });
  res.json(report);
}
export const updateReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const report = await prisma.report.update({
    where: { id },
    data: req.body,
  });
  res.json(report);
}
export const deleteReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.report.delete({ where: { id } });
  res.json({ message: "Report deleted successfully" });
}

export const updateUser = async (req: Request, res: Response) => {
  const { user_name, password } = req.body;
  // Check if user exists
  const user = await prisma.credentials.findFirst({
    where: { user_name, password },
  });

  if (user) {
    return res.json({ success: false, message: "This username has been taken" });
  }
  await prisma.credentials.create({
    data: {
      user_name: user_name,
      password: password
    }
  });

  res.json({ success: true, message: "Successful udate" })
}

export default {
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
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  updateUser
};