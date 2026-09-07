import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;