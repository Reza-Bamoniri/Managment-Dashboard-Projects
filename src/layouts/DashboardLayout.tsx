import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen((prv) => !prv)}
      />

      <div className="lg:pl-64">
        <Header
          onMenuClick={() => setIsSidebarOpen((prv) => !prv)}
          isMenuOpen={isSidebarOpen}
        />

        <main className="min-h-[calc(100vh-5rem)] p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;