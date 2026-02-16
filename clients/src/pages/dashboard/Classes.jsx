import { useContext } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const Classes = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={user?.role} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Classes</h1>
          <div className="bg-white p-4 rounded shadow">Class list and schedules placeholder.</div>
        </main>
      </div>
    </div>
  );
};

export default Classes;
