import { useState } from "react";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectStats from "../components/projects/ProjectStats";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectsPagination from "../components/projects/ProjectsPagination";
import type { ProjectStatus } from "../types/project";

function Projects() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  return (
    <div className="space-y-6">
      <ProjectsHeader />

      <ProjectStats />

      <ProjectFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <ProjectsGrid search={search} status={status} />

      <ProjectsPagination />
    </div>
  );
}

export default Projects;