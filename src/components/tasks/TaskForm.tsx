import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Project } from "../../types/project";
import type { Task } from "../../types/task";
import type { User } from "../../types/user";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .min(3, "Title must be at least 3 characters."),

  description: z
    .string()
    .min(1, "Description is required."),

  projectId: z
    .string()
    .min(1, "Project is required."),

  assignedTo: z
    .string()
    .min(1, "Assigned user is required."),

  priority: z.enum(["low", "medium", "high"]),

  status: z.enum(["todo", "in-progress", "completed"]),

  deadline: z
    .string()
    .min(1, "Deadline is required."),
});

export type TaskFormData = z.infer<typeof taskSchema>;

type TaskFormProps = {
  task?: Task | null;
  projects: Project[];
  users: User[];
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
};

function TaskForm({
  task,
  projects,
  users,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      projectId: task?.projectId ?? "",
      assignedTo: task?.assignedTo ?? "",
      priority: task?.priority ?? "medium",
      status: task?.status ?? "todo",
      deadline: task?.deadline ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          {...register("title")}
          className="
            w-full rounded-xl border border-gray-200
            bg-white px-4 py-2.5 text-sm
            text-gray-800 outline-none transition
            focus:border-green-500
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200
          "
          placeholder="Enter task title"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>

        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="
            w-full resize-none rounded-xl border border-gray-200
            bg-white px-4 py-2.5 text-sm
            text-gray-800 outline-none transition
            focus:border-green-500
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200
          "
          placeholder="Enter task description"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Project */}
      <div>
        <label
          htmlFor="projectId"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project
        </label>

        <select
          id="projectId"
          {...register("projectId")}
          className="
            w-full cursor-pointer rounded-xl border border-gray-200
            bg-white px-4 py-2.5 text-sm
            text-gray-800 outline-none transition
            focus:border-green-500
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200
          "
        >
          <option value="">Select project</option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        {errors.projectId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.projectId.message}
          </p>
        )}
      </div>

      {/* Assigned To */}
      <div>
        <label
          htmlFor="assignedTo"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Assigned To
        </label>

        <select
          id="assignedTo"
          {...register("assignedTo")}
          className="
            w-full cursor-pointer rounded-xl border border-gray-200
            bg-white px-4 py-2.5 text-sm
            text-gray-800 outline-none transition
            focus:border-green-500
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200
          "
        >
          <option value="">Select user</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {errors.assignedTo && (
          <p className="mt-1 text-sm text-red-500">
            {errors.assignedTo.message}
          </p>
        )}
      </div>

      {/* Priority + Status */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>

          <select
            id="priority"
            {...register("priority")}
            className="
              w-full cursor-pointer rounded-xl border border-gray-200
              bg-white px-4 py-2.5 text-sm
              text-gray-800 outline-none transition
              focus:border-green-500
              dark:border-gray-700 dark:bg-gray-950
              dark:text-gray-200
            "
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {errors.priority && (
            <p className="mt-1 text-sm text-red-500">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id="status"
            {...register("status")}
            className="
              w-full cursor-pointer rounded-xl border border-gray-200
              bg-white px-4 py-2.5 text-sm
              text-gray-800 outline-none transition
              focus:border-green-500
              dark:border-gray-700 dark:bg-gray-950
              dark:text-gray-200
            "
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label
          htmlFor="deadline"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Deadline
        </label>

        <input
          id="deadline"
          type="date"
          {...register("deadline")}
          className="
            w-full cursor-pointer rounded-xl border border-gray-200
            bg-white px-4 py-2.5 text-sm
            text-gray-800 outline-none transition
            focus:border-green-500
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200
          "
        />

        {errors.deadline && (
          <p className="mt-1 text-sm text-red-500">
            {errors.deadline.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            cursor-pointer rounded-xl border border-gray-200
            bg-white px-5 py-2.5 text-sm font-medium
            text-gray-600 transition hover:bg-gray-100
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-300 dark:hover:bg-gray-800
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
            cursor-pointer rounded-xl bg-green-600
            px-5 py-2.5 text-sm font-semibold text-white
            transition hover:bg-green-700
            dark:bg-green-500 dark:hover:bg-green-600
          "
        >
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;