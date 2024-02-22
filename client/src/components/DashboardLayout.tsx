import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function DashboardLayout({ children }: { children: any }) {
  const location = useLocation();
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav(!nav);
  const [loading, setLoading] = useState(true);
  const logoutUser = async () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  };

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if(!auth_token) {
      window.location.href = "/signin";
    } else {
      setLoading(false);
    }
  }, []);

  if(loading) return <div className="h-screen w-full flex justify-center items-center"> <p>Loading...</p></div>

  return (
    <>
      {/* <div className={`md:flex h-screen ${currentModal && "blur-sm"}`}> */}
      <div className={`md:flex h-screen`}>
        <nav
          className="grow md:max-w-xs md:w-[300px]
          border-r border-b w-full md:relative bg-[#fff] z-[10]
          flex justify-between fixed"
        >
          {/* Side Bar Navigation */}
          <div className="w-full flex flex-col">
            <Link to="/" className="logo flex pl-5 items-center py-6">
              <h1>ATGS</h1>
            </Link>
            <ul
              className={`${
                nav ? "block" : "hidden"
              } pl-5 pt-5 pb-6 max-h-screen relative text-[#ADBCC5] md:block grow`}
            >
              <li>
                <Link
                  to="/dashboard"
                  className={`flex gap-3 items-center mb-2 rounded-tl-md rounded-bl-md py-3 pl-3 hover:border-r-otc-blue border-r-2 border-transparent hover:text-otc-blue hover:bg-otc-blue/10 ${
                    location.pathname === "/dashboard"
                      ? "text-otc-blue border-r-otc-blue bg-otc-blue/10"
                      : ""
                  }`}
                >
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/departments"
                  className={`flex gap-3 items-center mb-2 rounded-tl-md rounded-bl-md py-3 pl-3 hover:border-r-otc-blue border-r-2 border-transparent hover:text-otc-blue hover:bg-otc-blue/10 ${
                    location.pathname.startsWith("/dashboard/departments")
                      ? "text-otc-blue border-r-otc-blue bg-otc-blue/10"
                      : ""
                  }`}
                >
                  <span>Departments</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/courses"
                  className={`flex gap-3 items-center mb-2 rounded-tl-md rounded-bl-md py-3 pl-3 hover:border-r-otc-blue border-r-2 border-transparent hover:text-otc-blue hover:bg-otc-blue/10 ${
                    location.pathname.startsWith("/dashboard/courses")
                      ? "text-otc-blue border-r-otc-blue bg-otc-blue/10"
                      : ""
                  }`}
                >
                  <span>Courses</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lecturers"
                  className={`flex gap-3 items-center mb-2 rounded-tl-md rounded-bl-md py-3 pl-3 hover:border-r-otc-blue border-r-2 border-transparent hover:text-otc-blue hover:bg-otc-blue/10 ${
                    location.pathname.startsWith("/dashboard/lecturers")
                      ? "text-otc-blue border-r-otc-blue bg-otc-blue/10"
                      : ""
                  }`}
                >
                  <span>Lecturers</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lecture-halls"
                  className={`flex gap-3 items-center mb-2 rounded-tl-md rounded-bl-md py-3 pl-3 hover:border-r-otc-blue border-r-2 border-transparent hover:text-otc-blue hover:bg-otc-blue/10 ${
                    location.pathname.startsWith("/dashboard/lecturers")
                      ? "text-otc-blue border-r-otc-blue bg-otc-blue/10"
                      : ""
                  }`}
                >
                  <span>Lecturer Halls</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/reports"
                  className={`flex gap-3 items-center mb-2 rounded-tl-md rounded-bl-md py-3 pl-3 hover:border-r-otc-blue border-r-2 border-transparent hover:text-otc-blue hover:bg-otc-blue/10 ${
                    location.pathname.startsWith("/dashboard/reports")
                      ? "text-otc-blue border-r-otc-blue bg-otc-blue/10"
                      : ""
                  }`}
                >
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <button
                  className={`flex gap-3 items-center mb-2 rounded-tl-md rounded-bl-md py-3 pl-4 w-full hover:border-r-otc-blue border-r-2 border-transparent hover:text-otc-blue hover:bg-otc-blue/10`}
                  onClick={logoutUser}
                >
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>

          <span
            className="md:hidden mt-6 mr-3 cursor-pointer"
            onClick={toggleNav}
          >
            {nav ? <span>&times;</span> : <span>&#9776;</span>}
          </span>
        </nav>

        <div className="main w-full flex flex-col">
          <main className="dashboard__content grow overflow-y-scroll p-8">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
