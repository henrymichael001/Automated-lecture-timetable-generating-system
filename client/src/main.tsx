import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/index.tsx'
import './index.css'
import NotFound from './pages/NotFound.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin.tsx';
import DashboardIndex from './pages/dashboard/index.tsx';
import DashboardCourses from './pages/dashboard/courses.tsx';
import DashboardLecturers from './pages/dashboard/lecturers.tsx';
import DashboardDepartments from './pages/dashboard/departments.tsx';
import DashboardLecturerHalls from './pages/dashboard/lecture-halls.tsx';
import { ToastContainer } from 'react-toast';
import GiveReportPage from './pages/GiveReport.tsx';
import DashboardReports from './pages/dashboard/reports.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/give-report",
    element: <GiveReportPage />,
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/dashboard",
    element: <DashboardIndex />
  },
  {
    path: "/dashboard/departments",
    element: <DashboardDepartments />
  },
  {
    path: "/dashboard/courses",
    element: <DashboardCourses />
  },
  {
    path: "/dashboard/lecturers",
    element: <DashboardLecturers />
  },
  {
    path: "/dashboard/lecture-halls",
    element: <DashboardLecturerHalls />
  },
  {
    path: "/dashboard/reports",
    element: <DashboardReports />
  },

  // 404
  {
    path: "*",
    element: <NotFound />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
