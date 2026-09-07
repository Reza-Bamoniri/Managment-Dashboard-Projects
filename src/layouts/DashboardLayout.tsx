import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <main className="min-h-screen pl-64">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;