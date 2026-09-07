import { BrowserRouter, Routes, Route } from "react-router";

import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route
            path="/"
            element={<Home/>}
          />

          <Route
            path="/projects"
            element={<div>Projects</div>}
          />

          <Route
            path="/tasks"
            element={<div>Tasks</div>}
          />

          <Route
            path="/users"
            element={<div>Users</div>}
          />

          <Route
            path="/notifications"
            element={<div>Notifications</div>}
          />

          <Route
            path="/settings"
            element={<div>Settings</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;