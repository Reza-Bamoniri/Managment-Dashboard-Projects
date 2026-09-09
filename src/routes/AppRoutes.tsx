import { BrowserRouter, Routes, Route } from "react-router";

import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import ProjectDetails from "../components/projects/ProjectDetails/ProjectDetails";
import Tasks from "../pages/Tasks";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/projects/:id" element={<ProjectDetails />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/users" element={<Users />} />

          <Route path="/comment" element={<div>Notifications</div>} />

          <Route path="/profile" element={<Profile />} />
        </Route>


        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
