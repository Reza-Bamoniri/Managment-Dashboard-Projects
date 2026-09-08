import ProjectCard from "./ProjectCard";

import type { Project } from "../../types/project";

type ProjectsGridProps = {
  projects: Project[];
};

function ProjectsGrid({ projects }: ProjectsGridProps) {
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
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

export default ProjectsGrid;