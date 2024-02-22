import { FormEvent, useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"

function DashboardLecturerHalls() {
  const [halls, setHalls] = useState<any>([]);
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");

  useEffect(() => {
    // Get lecturers
    const getLecturers = async () => {
      let headersList = {
        "Accept": "*/*"
       }
       
       let response = await fetch("/api/lecturehalls", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.json();
       if(response.ok) setHalls(data);
    }

    getLecturers();
  }, []);

  const addHall = async (e: FormEvent) => {
    e.preventDefault();
    let headersList = {
      "Accept": "*/*",
      "Content-type": "application/json"
     }
     
     try {
      let response = await fetch("/api/lecturehalls", { 
        method: "POST",
        headers: headersList,
        body: JSON.stringify({ name, faculty })
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
      <p>Lecturer Halls</p>

      <form onSubmit={addHall} className="flex gap-3 flex-wrap my-5">
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

      {halls.length ? (
        <table className="table-auto w-full font-light">
          <thead>
            <th className="font-light text-left border px-2">Name</th>
            <th className="font-light text-left border px-2">Faculty</th>
          </thead>
          <tbody>
          {halls.map((hall: any) => {
               return <tr>
               <td className="border px-2">{hall.name}</td>
               <td className="border px-2">{hall.faculty}</td>
             </tr>
            })}
          </tbody>
        </table>
      ) : (
        <div className="rounded-md border py-10 px-4 text-center text-zinc-700">
          <h3 className="text-2xl">No Lecture Halls yet</h3>
          <p className="text-zinc-500 text-sm mt-2">
            Add a lecture hall from the form above
          </p>
        </div>
      )}
    </DashboardLayout>
  )
}

export default DashboardLecturerHalls