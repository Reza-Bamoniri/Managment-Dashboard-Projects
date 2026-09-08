import type { Project } from "../../types/project";
import type { ProjectFormData } from "./ProjectForm";
import ProjectForm from "./ProjectForm";

type ProjectModalProps = {
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  project?: Project | null;
};

function ProjectModal({
  onClose,
  onSubmit,
  project,
}: ProjectModalProps) {
  const initialData: ProjectFormData | undefined = project
    ? {
        name: project.name,
        description: project.description,
        status: project.status,
        progress: project.progress,
        deadline: project.deadline,
      }
    : undefined;

  const isEditMode = Boolean(project);

  return (
    <div
      className="
        fixed
        inset-0
        z-100
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
          sm:p-8
          dark:bg-gray-900
        "
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {isEditMode ? "Edit Project" : "Add New Project"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update project information and save your changes."
                : "Create a new project and start tracking its progress."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              flex
              h-9
              w-9
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              bg-gray-100
              text-gray-500
              transition
              hover:bg-green-100
              hover:text-green-700
              dark:bg-gray-800
              dark:text-gray-400
              dark:hover:bg-green-950
              dark:hover:text-green-300
            "
          >
            ✕
          </button>
        </div>

        <ProjectForm
          initialData={initialData}
          submitText={isEditMode ? "Update Project" : "Create Project"}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default ProjectModal;