import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  status: z.enum(["planning", "in-progress", "completed"]),

  progress: z
    .number()
    .min(0)
    .max(100),

  deadline: z.string().min(1, "Deadline is required"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

type ProjectFormProps = {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
};

function ProjectForm({
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "planning",
      progress: 0,
      deadline: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="project-name"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project Name
        </label>

        <input
          id="project-name"
          type="text"
          {...register("name")}
          placeholder="Enter project name"
          className="
            w-full rounded-xl border border-gray-200
            bg-gray-50 px-4 py-3 text-sm text-gray-800
            outline-none transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200 dark:placeholder:text-gray-500
          "
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="project-description"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>

        <textarea
          id="project-description"
          rows={4}
          {...register("description")}
          placeholder="Describe the project..."
          className="
            w-full resize-none rounded-xl border border-gray-200
            bg-gray-50 px-4 py-3 text-sm text-gray-800
            outline-none transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200 dark:placeholder:text-gray-500
          "
        />

        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="project-status"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id="project-status"
            {...register("status")}
            className="
              w-full rounded-xl border border-gray-200
              bg-gray-50 px-4 py-3 text-sm text-gray-800
              outline-none transition
              focus:border-green-500
              focus:ring-2 focus:ring-green-500/20
              dark:border-gray-700 dark:bg-gray-950
              dark:text-gray-200
            "
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="project-progress"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Progress
          </label>

          <input
            id="project-progress"
            type="number"
            min="0"
            max="100"
            {...register("progress", {
              valueAsNumber: true,
            })}
            className="
              w-full rounded-xl border border-gray-200
              bg-gray-50 px-4 py-3 text-sm text-gray-800
              outline-none transition
              focus:border-green-500
              focus:ring-2 focus:ring-green-500/20
              dark:border-gray-700 dark:bg-gray-950
              dark:text-gray-200
            "
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="project-deadline"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Deadline
        </label>

        <input
          id="project-deadline"
          type="date"
          {...register("deadline")}
          className="
            w-full rounded-xl border border-gray-200
            bg-gray-50 px-4 py-3 text-sm text-gray-800
            outline-none transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700 dark:bg-gray-950
            dark:text-gray-200
          "
        />

        {errors.deadline && (
          <p className="mt-1 text-xs text-red-500">
            {errors.deadline.message}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-xl
            border border-gray-200
            bg-gray-50
            px-5 py-3
            text-sm font-medium text-gray-600
            transition hover:bg-gray-100
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
            rounded-xl
            bg-green-600
            px-5 py-3
            text-sm font-semibold text-white
            shadow-lg
            transition
            hover:-translate-y-0.5
            hover:bg-green-700
            dark:bg-green-700
            dark:hover:bg-green-600
          "
        >
          Create Project
        </button>
      </div>
    </form>
  );
}

export type { ProjectFormData };
export default ProjectForm;