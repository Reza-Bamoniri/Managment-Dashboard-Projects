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
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <ProjectsHeader />

      <ProjectStats />

      <ProjectFilters
        search={search}
        status={status}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
      />

      <ProjectsGrid
        search={search}
        status={status}
        currentPage={currentPage}
      />

      <ProjectsPagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Projects;