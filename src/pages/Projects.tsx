import { useEffect, useMemo, useState } from "react";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectStats from "../components/projects/ProjectStats";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectsPagination from "../components/projects/ProjectsPagination";
import ProjectModal from "../components/projects/ProjectModal";
import type { Project, ProjectStatus } from "../types/project";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createProjectThunk, fetchProjects, updateProjectThunk } from "../features/projects/projectsSlice";
import type { ProjectFormData } from "../components/projects/ProjectForm";
import { toast } from "sonner";

function Projects() {
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector((state) => state.projects);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);


const handleEditProject = (project: Project) => {
  setEditingProject(project);
  setIsModalOpen(true);
};
  



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
    setEditingProject(null);
  };

  const handleCreateProject = async (data: ProjectFormData) => {
  try {
    await dispatch(
      createProjectThunk({
        ...data,
        managerId: "1",
        memberIds: [],
      })
    ).unwrap();

    setIsModalOpen(false);

    toast.success("Project created successfully.");
  } catch {
    toast.error("Failed to create project.");
  }
};



const handleUpdateProject = async (data: ProjectFormData) => {
  if (!editingProject) return;

  try {
    await dispatch(
      updateProjectThunk({
        id: editingProject.id,
        project: {
          ...data,
          managerId: editingProject.managerId,
          memberIds: editingProject.memberIds,
        },
      })
    ).unwrap();

    handleCloseModal();

    toast.success("Project updated successfully.");
  } catch {
    toast.error("Failed to update project.");
  }
};








  return (
    <div className="space-y-6">
      <ProjectsHeader onAddProject={handleAddProject}  />

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
                project={editingProject}
                onClose={handleCloseModal}
                onSubmit={editingProject ? handleUpdateProject : handleCreateProject}/>
      )}
    </div>
  );
}

export default Projects;