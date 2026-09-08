import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Task } from "../../../types/task";

type TaskRowProps = {
  task: Task;
  projectName: string;
  assignedUserName: string;
  onEdit: () => void;
  onDelete: () => void;
};

function TaskRow({
  task,
  projectName,
  assignedUserName,
  onEdit,
  onDelete,
}: TaskRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0 dark:border-gray-800">
      <td className="px-5 py-4">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-200">
            {task.title}
          </p>

          <p className="mt-1 max-w-xs truncate text-xs text-gray-500 dark:text-gray-400">
            {task.description}
          </p>
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
        {projectName}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
        {assignedUserName}
      </td>

      <td className="px-5 py-4">
        <span
          className={`
            inline-flex rounded-full px-3 py-1 text-xs font-medium
            ${
              task.priority === "high"
                ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
            }
          `}
        >
          {task.priority}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`
            inline-flex rounded-full px-3 py-1 text-xs font-medium
            ${
              task.status === "completed"
                ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300"
                : task.status === "in-progress"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }
          `}
        >
          {task.status === "in-progress"
            ? "In Progress"
            : task.status === "todo"
              ? "To Do"
              : "Completed"}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
        {task.deadline}
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit task"
            className="
              cursor-pointer rounded-lg p-2 text-gray-500
              transition hover:bg-green-100 hover:text-green-700
              dark:text-gray-400 dark:hover:bg-green-950
              dark:hover:text-green-300
            "
          >
            <FiEdit2 size={17} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete task"
            className="
              cursor-pointer rounded-lg p-2 text-gray-500
              transition hover:bg-red-100 hover:text-red-700
              dark:text-gray-400 dark:hover:bg-red-950
              dark:hover:text-red-300
            "
          >
            <FiTrash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TaskRow;