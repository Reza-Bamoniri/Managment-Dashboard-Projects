import type { Task } from "../../../types/task";
import TaskRow from "./TaskRow";

type TasksTableProps = {
  tasks: Task[];
  projects: {
    id: string;
    name: string;
  }[];
  users: {
    id: string;
    name: string;
  }[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

function TasksTable({
  tasks,
  projects,
  users,
  onEdit,
  onDelete,
}: TasksTableProps) {
  const getProjectName = (projectId: string) => {
    return (
      projects.find((project) => project.id === projectId)?.name ??
      "Unknown Project"
    );
  };

  const getUserName = (userId: string) => {
    return (
      users.find((user) => user.id === userId)?.name ??
      "Unknown User"
    );
  };

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-245 text-left">
          <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Task
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Project
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Assigned To
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Priority
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Deadline
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                projectName={getProjectName(task.projectId)}
                assignedUserName={getUserName(task.assignedTo)}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TasksTable;