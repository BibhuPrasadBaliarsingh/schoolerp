import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { SidebarProvider } from "./context/SidebarContext";
import Students from "./pages/dashboard/Students";
import Teachers from "./pages/dashboard/Teachers";
import Fees from "./pages/dashboard/Fees";
import Classes from "./pages/dashboard/Classes";
import Assignments from "./pages/dashboard/Assignments";
import Courses from "./pages/dashboard/Courses";
import Homework from "./pages/dashboard/Homework";
import Users from "./pages/admin/Users";
import BusTracking from "./pages/dashboard/BusTracking";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/dashboard/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/dashboard/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
          <Route path="/dashboard/fees" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
          <Route path="/dashboard/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
          <Route path="/dashboard/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/dashboard/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/dashboard/homework" element={<ProtectedRoute><Homework /></ProtectedRoute>} />
          <Route path="/dashboard/bus-tracking" element={<ProtectedRoute><BusTracking /></ProtectedRoute>} />
        </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
