import { Course, Department, LectureHall, Lecturer } from "@prisma/client";


function randomBoolean() {
  return Math.random() < 0.5; // Adjust the threshold as needed (0.5 = 50% chance of true)
}

function shuffleArray(array: any[]) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const generateTimetable = (
  courses: (Course & { department: Department })[],
  lectureHalls: LectureHall[]
) => {
  // Create an array of days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // Hold all Lecture Hall name
  const lectureHallNames = lectureHalls.map((hall) => hall.name);
  const usedHalls: string[] = [];

  const timetableResult: any[] = [];
  for (let day of daysOfWeek) {
    // Create an array of periods of time ranging from 8am to 4pm with 1 hour intervals
    const periodsOfDay: string[] = [
      "8am - 9am",
      "9am - 10am",
      "10am - 11am",
      "11am - 12pm",
      "12pm - 1pm",
      "1pm - 2pm",
      "2pm - 3pm",
      "3pm - 4pm",
      "4pm - 5pm",
      "5pm - 6pm",
    ];
    const periods: any = {};

    if (day === "Monday") {
      const topPriorityCourses = courses.slice(0, 3);
      topPriorityCourses.forEach((course) => {
        if (course.priority === 3) {
          const period1: string = periodsOfDay.shift() as string;
          const period2: string = periodsOfDay.shift() as string;
          const period3: string = periodsOfDay.shift() as string;
          const shuffledHalls = shuffleArray([...lectureHallNames]);
          const hall = shuffledHalls.pop() || lectureHallNames.pop() || usedHalls.pop();
          usedHalls.push(hall);
          periods[period1] = { course, hall };
          periods[period2] = { course, hall };
          if (randomBoolean()) {
            periods[period3] = { course: { title: "Break" }, hall };
          } else {
            periods[period3] = { course, hall };
          }
        } else if (course.priority === 2) {
          const period1: string = periodsOfDay.shift() as string;
          const period2: string = periodsOfDay.shift() as string;
          const shuffledHalls = shuffleArray([...lectureHallNames]);
          const hall = shuffledHalls.pop() || lectureHallNames.pop() || usedHalls.pop();
          usedHalls.push(hall); // Mark hall as used
          if (randomBoolean()) {
            periods[period2] = { course: { title: "Break", hall } };
          } else {
            periods[period2] = { course, hall };
          }
        }
      });
    } else {
      const lowPriorityCourses = courses.slice(3).concat(courses.slice(0, 3));
      lowPriorityCourses.forEach((course) => {
        if (
          (course.priority === 2 || course.priority == 3) &&
          periodsOfDay.length >= 2
        ) {
          const period1: string = periodsOfDay.shift() as string;
          const period2: string = periodsOfDay.shift() as string;
          const shuffledHalls = shuffleArray([...lectureHallNames]);
          const hall = shuffledHalls.pop() || usedHalls.pop();
          usedHalls.push(hall); // Mark hall as used
          periods[period1] = { course, hall };
          if (randomBoolean()) {
            periods[period2] = { course: { title: "Break" }, hall };
          } else {
            periods[period2] = { course, hall };
          }
        } else {
          const period: string = periodsOfDay.shift() as string;
          const shuffledHalls = shuffleArray([...lectureHallNames]);
          const hall = shuffledHalls.pop() || usedHalls.pop();
          usedHalls.push(hall); // Mark hall as used
          periods[period] = { course, hall };
        }
      });
    }

    delete periods['undefined'];

    periods["1pm - 2pm"] = { course: { title: "Break" }, hall: "" };
    timetableResult.push({
      day,
      periods,
    });
  }

  return timetableResult;
};

export default generateTimetable;
