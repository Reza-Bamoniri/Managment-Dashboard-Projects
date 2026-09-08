import { FiX } from "react-icons/fi";

import TaskForm from "./TaskForm";

import type { Project } from "../../types/project";
import type { Task } from "../../types/task";
import type { User } from "../../types/user";

import type { TaskFormData } from "./TaskForm";

type TaskModalProps = {
  task?: Task | null;
  projects: Project[];
  users: User[];
  onSubmit: (data: TaskFormData) => void;
  onClose: () => void;
};

function TaskModal({
  task,
  projects,
  users,
  onSubmit,
  onClose,
}: TaskModalProps) {
  const isEditMode = Boolean(task);

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 p-4 backdrop-blur-sm
      "
    >
      <div
        className="
          max-h-[90vh] w-full max-w-2xl overflow-y-auto
          rounded-2xl bg-white p-6 shadow-2xl
          dark:bg-gray-900
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {isEditMode ? "Edit Task" : "Create Task"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update task information"
                : "Create a new task"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              cursor-pointer rounded-lg p-2
              text-gray-500 transition
              hover:bg-gray-100 hover:text-gray-700
              dark:text-gray-400 dark:hover:bg-gray-800
              dark:hover:text-gray-200
            "
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <TaskForm
          task={task}
          projects={projects}
          users={users}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default TaskModal;