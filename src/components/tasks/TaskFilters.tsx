import type { TaskPriority, TaskStatus } from "../../types/task";

type TaskFiltersProps = {
  search: string;
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  projectId: string;
  projectOptions: {
    id: string;
    name: string;
  }[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TaskStatus | "all") => void;
  onPriorityChange: (value: TaskPriority | "all") => void;
  onProjectChange: (value: string) => void;
};

function TaskFilters({
  search,
  status,
  priority,
  projectId,
  projectOptions,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onProjectChange,
}: TaskFiltersProps) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label
            htmlFor="task-search"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Search
          </label>

          <input
            id="task-search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="
              w-full rounded-xl border border-gray-200
              bg-gray-50 px-4 py-2.5 text-sm outline-none
              transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20
              dark:border-gray-700 dark:bg-gray-950
              dark:text-gray-200 dark:placeholder:text-gray-500
            "
          />
        </div>

        <div>
          <label
            htmlFor="task-status"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id="task-status"
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as TaskStatus | "all"
              )
            }
            className="
              w-full cursor-pointer rounded-xl border border-gray-200
              bg-gray-50 px-4 py-2.5 text-sm outline-none
              transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20
              dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200
            "
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="task-priority"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>

          <select
            id="task-priority"
            value={priority}
            onChange={(event) =>
              onPriorityChange(
                event.target.value as TaskPriority | "all"
              )
            }
            className="
              w-full cursor-pointer rounded-xl border border-gray-200
              bg-gray-50 px-4 py-2.5 text-sm outline-none
              transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20
              dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200
            "
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="task-project"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Project
          </label>

          <select
            id="task-project"
            value={projectId}
            onChange={(event) => onProjectChange(event.target.value)}
            className="
              w-full cursor-pointer rounded-xl border border-gray-200
              bg-gray-50 px-4 py-2.5 text-sm outline-none
              transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20
              dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200
            "
          >
            <option value="all">All Projects</option>

            {projectOptions.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default TaskFilters;