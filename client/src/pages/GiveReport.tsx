import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

function GiveReportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [feedback, setFeedback] = useState("");


  const giveReport = async (e: FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      email,
      occupation,
      feedback
    });

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ name, email, occupation, feedback })
      });
      console.log(res);
      if(res.ok) {
        alert("Feedback submitted");
        window.location.href = "/";
      }
    } catch (err) {
      alert("Sorry an error occured");
    }
  }

  return (
    <div className="bg-[url('/images/school-buildings.jpg')] bg-cover bg- min-h-screen">
      <div className="min-h-screen w-full bg-black/75 py-8 px-4">
        <form onSubmit={giveReport} className="bg-white max-w-md rounded mx-auto my-5 py-5 px-2">
          <p className="text-center text-2xl">Feedback</p>
          <p className="text-sm mb-5 text-center text-zinc-400">Give your feedback concerning a timetable</p>

          <div className="grid gap-2">
            <input
              required
              type="text"
              onChange={e => setName(e.target.value)}
              placeholder="Enter full name"
              className="block px-2 py-2 border w-full rounded"
            />
            <input
              required
              type="text"
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter valid school email"
              className="block px-2 py-2 border w-full rounded"
            />
            <select required className="p-2 rounded border" onChange={e => setOccupation(e.target.value)}>
              <option value="">Select occupation</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Student">Student</option>
            </select>

            <textarea onChange={e => setFeedback(e.target.value)} className="border resize-none p-2 rounded min-h-[200px]" placeholder="Give your feedback here"></textarea>
          </div>

          <button type="submit" className="block text-center w-full mt-2 py-2 bg-black text-white rounded">Submit</button>
        </form>

        <Link to="/" className="text-center text-white block">
          Back
        </Link>
      </div>
    </div>
  );
}

export default GiveReportPage;
