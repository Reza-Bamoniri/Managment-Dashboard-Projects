import { useEffect, useMemo, useState } from "react";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectStats from "../components/projects/ProjectStats";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectsPagination from "../components/projects/ProjectsPagination";
import ProjectModal from "../components/projects/ProjectModal";
import type { ProjectStatus } from "../types/project";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createProjectThunk, fetchProjects } from "../features/projects/projectsSlice";
import type { ProjectFormData } from "../components/projects/ProjectForm";

function Projects() {
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector((state) => state.projects);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const handleAddProject = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (data: ProjectFormData) => {
  await dispatch(
    createProjectThunk({
      ...data,
      managerId: "1",
      memberIds: [],
    })
  );

  setIsModalOpen(false);
};

  return (
    <div className="space-y-6">
      <ProjectsHeader onAddProject={handleAddProject} />

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
        projects={filteredProjects}
        currentPage={currentPage}
      />

      <ProjectsPagination
        currentPage={currentPage}
        totalItems={filteredProjects.length}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <ProjectModal
          onClose={handleCloseModal}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  );
}

export default Projects;