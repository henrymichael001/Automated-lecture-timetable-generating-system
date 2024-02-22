import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function DashboardCourses() {
  const [courses, setCourses] = useState<any>([]);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [lecturer, setLecturer] = useState("");

  useEffect(() => {
    // Get courses
    const getCourses = async () => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch("/api/courses", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       if(response.ok) setCourses(data);
    }

    const getLecturers = async () => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch("/api/lecturers", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       if(response.ok) setLecturers(data);
    }

    // Get departments
    const getDepartments = async () => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch("/api/departments", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       if(response.ok) setDepartments(data);
    }

    getCourses();
    getLecturers();
    getDepartments();
  }, []);

  const addCourse = async (e: FormEvent) => {
    e.preventDefault();
    let headersList = {
      "Accept": "*/*",
      "Content-type": "application/json"
     }
     
     try {
      let response = await fetch("/api/courses", { 
        method: "POST",
        headers: headersList,
        body: JSON.stringify({ title, departmentID: department, lecturerID: lecturer, priority: Number(priority) })
      });
      
      // let data = await response.json();
 
      if(response.ok) {
       window.location.reload();
      } else {
       alert("Sorry an error occcured");
      };
     } catch (err) {
      console.log(err);
      alert("Sorry an error occcured");
     }
  }
  
  return (
    <DashboardLayout>
      <p>Courses</p>

      <form onSubmit={addCourse} className="my-5">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            name="name"
            id="name"
            className="border px-2 py-1"
            placeholder="Course title"
          onChange={e => setTitle(e.target.value)}
          />
          <select
            name="department"
            id="department"
            className="px-2 bg-white border"
            placeholder="Department"
            onChange={e => setDepartment(e.target.value)}
          >
            <option value="">Select department</option>
            {departments.map((dept: any) => <option value={dept.id} key={dept.id}>{dept.name}</option>)}
          </select>

          <select
            name="lecturer"
            id="lecturer"
            className="px-2 bg-white border"
            placeholder="Lecturer"
            onChange={e => setLecturer(e.target.value)}
          >
            <option value="">Select lecturer</option>
            {lecturers.map((dept: any) => <option value={dept.id} key={dept.id}>{dept.name}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-3">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            className="px-2 bg-white border"
            placeholder="priority"
            onChange={e => setPriority(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>

          <button
            type="submit"
            className="outline-none border-none px-2 text-sm bg-zinc-700 text-white rounded"
          >
            Add
          </button>
        </div>
      </form>

      {courses.length ? (
        <table className="table-auto w-full font-light">
          <thead>
            <th className="font-light text-left border px-2">Name</th>
            <th className="font-light text-left border px-2">Courses</th>
            <th className="font-light text-left border px-2">lecturers</th>
          </thead>
          <tbody>
          {courses.map((department: any) => {
               return <tr>
               <td className="border px-2">{department.title}</td>
               <td className="border px-2">{department.courses?.length || 0}</td>
               <td className="border px-2">{department.lecturers?.length || 0}</td>
             </tr>
            })}
          </tbody>
        </table>
      ) : (
        <div className="rounded-md border py-10 px-4 text-center text-zinc-700">
          <h3 className="text-2xl">No Courses yet</h3>
          <p className="text-zinc-500 text-sm mt-2">
            Add a course from the form above
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

export default DashboardCourses;
