import { useContext } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const Courses = () => {
  const { user } = useContext(AuthContext);

  const dummy = [
    { id: 1, title: "Mathematics" },
    { id: 2, title: "English" },
    { id: 3, title: "Science" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={user?.role} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">My Courses</h1>

          <div className="bg-white p-4 rounded shadow">
            <ul className="space-y-3">
              {dummy.map((c) => (
                <li key={c.id} className="p-3 bg-white/0 rounded">
                  {c.title}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
