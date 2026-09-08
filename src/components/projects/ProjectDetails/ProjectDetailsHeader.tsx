import { Link } from "react-router";
import type { Project } from "../../../types/project";

type ProjectDetailsHeaderProps = {
  project: Project;
};

function ProjectDetailsHeader({
  project,
}: ProjectDetailsHeaderProps) {
  return (
    <section
      className="
        rounded-3xl
        bg-linear-to-r
        from-green-900
        via-green-700
        to-green-500
        p-6
        shadow-2xl
        sm:p-8
        dark:from-gray-950
        dark:via-green-950
        dark:to-green-800
      "
    >
      <Link
        to="/projects"
        className="
          inline-flex
          cursor-pointer
          items-center
          rounded-xl
          bg-white/10
          px-4
          py-2
          text-sm
          font-medium
          text-white
          backdrop-blur-sm
          transition
          delay-100
          hover:-translate-y-0.5
          hover:bg-green-100
          hover:text-green-800
          dark:bg-white/5
          dark:hover:bg-green-900
          dark:hover:text-green-200
        "
      >
        ← Back to Projects
      </Link>

      <div className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {project.name}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100/80 sm:text-base">
              {project.description}
            </p>
          </div>

          <span
            className="
              w-fit
              rounded-full
              bg-white/15
              px-4
              py-2
              text-2xl
              font-semibold
              text-white
              backdrop-blur-sm
              dark:bg-green-900/60
              dark:text-green-200
            "
          >
            {project.status}
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetailsHeader;