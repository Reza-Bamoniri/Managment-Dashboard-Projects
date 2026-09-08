import type { Task } from "../../../types/task";

type ProjectTasksProps = {
  tasks: Task[];
};

function ProjectTasks({ tasks }: ProjectTasksProps) {
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Project Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {tasks.length} tasks in this project
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center dark:bg-gray-950">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No tasks found for this project.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
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
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/60 dark:text-green-300">
                    {task.status}
                  </span>

                  <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                Deadline: {task.deadline}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectTasks;