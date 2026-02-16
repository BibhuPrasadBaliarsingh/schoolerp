import { useContext } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const Homework = () => {
  const { user } = useContext(AuthContext);

  const dummy = [
    { id: 1, title: "Chapter 1 exercises", due: "2026-02-20" },
    { id: 2, title: "Essay: My School", due: "2026-02-25" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={user?.role} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Homework</h1>

          <div className="grid gap-4">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-600">Homework list and submission UI placeholder.</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
              <ul className="space-y-3">
                {dummy.map((h) => (
                  <li key={h.id} className="flex justify-between items-center">
                    <span className="font-medium">{h.title}</span>
                    <span className="text-sm text-gray-500">Due: {h.due}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Homework;
