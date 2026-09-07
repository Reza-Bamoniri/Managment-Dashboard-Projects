import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="pl-64">
        <Header />

        <main className="min-h-[calc(100vh-4rem)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;