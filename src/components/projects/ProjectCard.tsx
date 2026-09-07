import type { Project } from "../../types/project";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-5
        shadow-2xl
        transition
        delay-100
        hover:-translate-y-0.5
        hover:bg-green-100
        dark:border-green-900/40
        dark:bg-gray-900
        dark:shadow-black/40
        dark:hover:bg-green-950/70
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-800 dark:text-gray-200">
            {project.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {project.description}
          </p>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-medium
            text-green-700
            dark:bg-green-900/60
            dark:text-green-300
          "
        >
          {project.status}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Progress
          </span>

          <span className="font-semibold text-green-700 dark:text-green-400">
            {project.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Deadline
          </p>

          <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {project.deadline}
          </p>
        </div>

        <button
          type="button"
          className="
            rounded-xl
            bg-green-50
            px-4
            py-2
            text-sm
            font-medium
            text-green-700
            transition
            hover:bg-green-200
            dark:bg-green-950/70
            dark:text-green-300
            dark:hover:bg-green-900
          "
        >
          View
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;