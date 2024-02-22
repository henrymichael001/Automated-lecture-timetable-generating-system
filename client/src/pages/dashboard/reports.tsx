import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { format } from "date-fns";
import Modal from "react-modal";

function DashboardReports() {
  const [reports, setReports] = useState<any>([]);
  const [report, setReport] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      try {
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        let response = await fetch("/api/reports", {
          method: "GET",
          headers: headersList,
        });

        let data = await response.json();
        console.log(data);
        if (response.ok) setReports(data);
      } catch (err) {
        console.log(err);
      }
    };
    getReports();
  }, []);

  return (
    <DashboardLayout>
      <Modal
        isOpen={showModal}
        style={{
          overlay: {
            zIndex: 12,
          },
          content: {
            width: "50%",
            maxHeight: "fit",
            margin: "0 auto",
          },
        }}
        contentLabel="Example Modal"
      >
        <h2 className="text-2xl text-center">Feedback</h2>
        <code className="mt-5 block">
          <pre>Name: {report.name}</pre>
          <pre>Email: {report.email}</pre>
          <pre>Occupation: {report.occupation}</pre>
        </code>
        <p className="text-zinc-500 mt-10 overflow-auto">
          {report.feedback}
        </p>
        <button type="button" className="text-center block w-fit mx-auto mt-5 bg-black text-white px-10 py-1.5 rounded" onClick={() => setShowModal(false)}>Close</button>
      </Modal>
      <p className="text-zinc-500">See timetable feedback</p>
      <p>
        <span className="font-semibold">Total reports: </span> {reports.length}
      </p>

      {reports?.length ? (
        <table className="table-auto w-full font-light">
          <thead>
            <th className="font-light text-left border px-2">Name</th>
            <th className="font-light text-left border px-2">Email</th>
            <th className="font-light text-left border px-2">Occupation</th>
            <th className="font-light text-left border px-2">Time</th>
          </thead>
          <tbody>
            {reports.map((report: any) => {
              return (
                <tr className="cursor-pointer" onClick={
                  () => {
                    setShowModal(true);
                    setReport(report);
                  }
                }>
                  <td className="border px-2">{report.name}</td>
                  <td className="border import Modal from 'react-modal';px-2">
                    {report.email}
                  </td>
                  <td className="border px-2">{report.occupation}</td>
                  <td className="border px-2">
                    {format(new Date(report.createdAt), "HH:mm dd/MM/yy")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="rounded-md border py-10 mt-4 px-4 text-center text-zinc-700">
          <h3 className="text-2xl">No Reports yet</h3>
          <p className="text-zinc-500 text-sm mt-2">
            No reports has been submitted yet
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

export default DashboardReports;
