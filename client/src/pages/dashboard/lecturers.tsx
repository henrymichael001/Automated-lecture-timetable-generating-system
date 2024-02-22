import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function DashboardLecturers() {
  const [lecturers, setLecturers] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    // Get lecturers
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

    getDepartments();
    getLecturers();

  }, []);

  const addLecturer = async (e: FormEvent) => {
    e.preventDefault();

    let headersList = {
      "Accept": "*/*",
      "Content-type": "application/json"
     }
     
     try {
      let response = await fetch("/api/lecturers", { 
        method: "POST",
        headers: headersList,
        body: JSON.stringify({ name, departmentID: department, specialty })
      });
      
      let data = await response.json();
      console.log(data);
 
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
      <p>Lecturers</p>

      <form onSubmit={addLecturer} className="flex gap-3 flex-wrap my-5">
        <input
          type="text"
          name="name"
          id="name"
          className="border px-2 py-1"
          placeholder="Full Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          name="faculty"
          id="faculty"
          className="border px-2 py-1"
          placeholder="Specialty"
          onChange={e => setSpecialty(e.target.value)}
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
        <button
          type="submit"
          className="outline-none border-none px-2 text-sm bg-zinc-700 text-white rounded"
        >
          Add
        </button>
      </form>

      {lecturers.length ? (
        <table className="table-auto w-full font-light">
          <thead>
            <th className="font-light text-left border px-2">Name</th>
            <th className="font-light text-left border px-2">Faculty</th>
            <th className="font-light text-left border px-2">Department</th>
            <th className="font-light text-left border px-2">Courses</th>
          </thead>
          <tbody>
            {lecturers.map((lecturer: any) => {
               return <tr>
               <td className="border px-2">{lecturer.name}</td>
               <td className="border px-2">{lecturer.specialty}</td>
               <td className="border px-2">{lecturer.department?.name}</td>
               <td className="border px-2">{lecturer.courses?.length || 0}</td>
             </tr>
            })}
          </tbody>
        </table>
      ) : (
        <div className="rounded-md border py-10 px-4 text-center text-zinc-700">
          <h3 className="text-2xl">No Lecturers yet</h3>
          <p className="text-zinc-500 text-sm mt-2">
            Add a lecturer from the form above
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

export default DashboardLecturers;
