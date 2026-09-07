import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProjects } from "../../features/projects/projectsSlice";
import ProjectCard from "./ProjectCard";
import type { ProjectStatus } from "../../types/project";

type ProjectsGridProps = {
  search: string;
  status: ProjectStatus | "all";
};

function ProjectsGrid({ search, status }: ProjectsGridProps) {
  const dispatch = useAppDispatch();

  const { projects, loading, error } = useAppSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || project.status === status;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <section className="rounded-2xl bg-white p-6 text-center shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading projects...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      </section>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <section className="rounded-2xl bg-white p-10 text-center shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No projects found.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

export default ProjectsGrid;