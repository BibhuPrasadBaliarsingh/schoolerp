import { useContext } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const Assignments = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={user?.role} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Assignments</h1>
          <div className="bg-white p-4 rounded shadow">Assignment management placeholder.</div>
        </main>
      </div>
    </div>
  );
};

export default Assignments;
