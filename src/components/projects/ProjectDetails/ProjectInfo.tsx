import type { Project } from "../../../types/project";

type ProjectInfoProps = {
  project: Project;
};

function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <section
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-2xl
        dark:bg-gray-900
        dark:shadow-black/40
      "
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Project Information
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div
          className="
            rounded-xl
            bg-gray-50
            p-4
            transition
            delay-100
            hover:-translate-y-0.5
            hover:bg-green-100
            dark:bg-gray-950
            dark:hover:bg-green-950/70
          "
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Progress
          </p>

          <p className="mt-2 text-2xl font-bold text-green-700 dark:text-green-400">
            {project.progress}%
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div
          className="
            rounded-xl
            bg-gray-50
            p-4
            transition
            delay-100
            hover:-translate-y-0.5
            hover:bg-green-100
            dark:bg-gray-950
            dark:hover:bg-green-950/70
          "
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Deadline
          </p>

          <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            {project.deadline}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProjectInfo;