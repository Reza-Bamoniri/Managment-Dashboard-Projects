import ProjectCard from "./ProjectCard";
import type { Project } from "../../types/project";

type ProjectsGridProps = {
  projects: Project[];
  currentPage: number;
};

const PROJECTS_PER_PAGE = 6;

function ProjectsGrid({
  projects,
  currentPage,
}: ProjectsGridProps) {
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;

  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  if (projects.length === 0) {
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
      {paginatedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

export { PROJECTS_PER_PAGE };

export default ProjectsGrid;