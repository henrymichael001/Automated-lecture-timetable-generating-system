import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-[url('/images/school-buildings.jpg')] bg-cover bg-center min-h-screen">
      <div className="min-h-screen w-full bg-black/75 py-8 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <img
            src="/images/school-logo.png"
            alt="school logo"
            className="w-28 mt-8 mb-14"
          />
          <h1 className="text-7xl font-bold">
            Elevate <br />
            Education
          </h1>
          <p className="mt-5 max-w-xl">
            Introducing an automated timetable generation system. It simplifies
            the process of creating and managing timetables, making it efficient
            and user-friendly.
          </p>
          <br />
          <div className="flex gap-2">
          <Link to="/signin">
            <button className="bg-white text-zinc-500 px-10 py-2 rounded-3xl">
              Login Now
            </button>
          </Link>
          <Link to="/give-report">
            <button className="bg-white text-zinc-500 px-10 py-2 rounded-3xl">
              Give report
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
