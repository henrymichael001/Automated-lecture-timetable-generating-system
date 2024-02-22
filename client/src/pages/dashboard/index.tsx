import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

const DashboardCard = (props: { value: string | number, title: string}) => (
  <div className="text-center border rounded py-5 px-4">
    <h1 className="text-3xl">{props.value}</h1>
    <p>{props.title}</p>
  </div>
);

function DashboardIndex() {
  const [dashboardData, setDashboardData] = useState<any>({});

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
         let response = await fetch("/api/dashboard-data", { 
           method: "GET",
           headers: headersList
         });
         
         let data = await response.json();
         console.log(data);
         if(response.ok) setDashboardData(data.data);
         
      } catch (err) {
        console.log(err);
      }
    }
    getDashboardData();
  }, []);
  
  return (
    <DashboardLayout>
      <p className="text-zinc-500">Automated timetabel generation system</p>

      <div className="grid mt-5 gap-3 grid-cols-2">
        <DashboardCard title="Course" value={dashboardData.courseCount} />
        <DashboardCard title="Departments" value={dashboardData.departmentCount} />
        <DashboardCard title="Lecturers" value={dashboardData.lecturerCount} />
        <DashboardCard title="Lecture Halls" value={dashboardData.lectureHallCount} />
      </div>
    </DashboardLayout>
  );
}

export default DashboardIndex;
