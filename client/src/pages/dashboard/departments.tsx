import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { toast } from "react-toast";

function DashboardDepartments() {
  const [departments, setDepartments] = useState<any>([]);
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");

  useEffect(() => {
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

    getDepartments();
  }, []);

  const addDepartment = async (e: FormEvent) => {
    e.preventDefault();
    let headersList = {
      "Accept": "*/*",
      "Content-type": "application/json"
     }
     
     try {
      let response = await fetch("/api/departments", { 
        method: "POST",
        headers: headersList,
        body: JSON.stringify({ name, faculty })
      });
      
      let data = await response.json();
      console.log(data);
 
      if(response.ok) {
       window.location.reload();
      } else {
       toast.error("Sorry an error occcured");
      };
     } catch (err) {
      console.log(err);
      toast.error("Sorry an error occcured");
     }
  }

  return (
    <DashboardLayout>
      <p className="text-zinc-500">Departments</p>

      <form onSubmit={addDepartment} className="flex gap-3 flex-wrap my-5">
        <input
          type="text"
          name="name"
          id="name"
          className="border px-2 py-1"
          placeholder="Department Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          name="faculty"
          id="faculty"
          className="border px-2 py-1"
          placeholder="Faculty"
          onChange={e => setFaculty(e.target.value)}
        />
        <button
          type="submit"
          className="outline-none border-none px-2 text-sm bg-zinc-700 text-white rounded"
        >
          Add
        </button>
      </form>

      {departments.length ? (
        <table className="table-auto w-full font-light">
          <thead>
            <th className="font-light text-left border px-2">Name</th>
            <th className="font-light text-left border px-2">Faculty</th>
            <th className="font-light text-left border px-2">Courses</th>
            <th className="font-light text-left border px-2">lecturers</th>
            <th className="font-light text-left border px-2">Action</th>
          </thead>
          <tbody>
            {departments.map((department: any) => {
               return <tr>
               <td className="border px-2">{department.name}</td>
               <td className="border px-2">{department.faculty}</td>
               <td className="border px-2">{department.courses?.length || 0}</td>
               <td className="border px-2">{department.lecturers?.length || 0}</td>
               <td className="border px-2"><a target="_blank" href={`/api/courses/get-timetable?departmentID=${department.id}`} className="btn text-blue-500 underline cursor-pointer">Generate timetable</a></td>
             </tr>
            })}
          </tbody>
        </table>
      ) : (
        <div className="rounded-md border py-10 px-4 text-center text-zinc-700">
          <h3 className="text-2xl">No Departments yet</h3>
          <p className="text-zinc-500 text-sm mt-2">
            Add a department from the form above
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

export default DashboardDepartments;
