import { FiPlus } from "react-icons/fi";

type TasksHeaderProps = {
  onAddTask: () => void;
};

function TasksHeader({ onAddTask }: TasksHeaderProps) {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Tasks
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and track your project tasks
        </p>
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className="
          inline-flex cursor-pointer items-center justify-center gap-2
          rounded-xl bg-green-600 px-4 py-2.5
          text-sm font-semibold text-white
          transition hover:bg-green-700
          dark:bg-green-500 dark:hover:bg-green-600
        "
      >
        <FiPlus size={18} />
        Add Task
      </button>
    </section>
  );
}

export default TasksHeader;