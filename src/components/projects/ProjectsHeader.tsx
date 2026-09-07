type ProjectsHeaderProps = {
  onAddProject: () => void;
};

function ProjectsHeader({
  onAddProject,
}: ProjectsHeaderProps) {
  return (
    <section
      className="
        flex
        flex-col
        gap-4
        rounded-3xl
        bg-linear-to-r
        from-green-900
        via-green-700
        to-green-500
        p-6
        shadow-2xl
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:p-8
        dark:from-gray-950
        dark:via-green-950
        dark:to-green-800
      "
    >
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Projects
        </h1>

        <p className="mt-2 text-sm text-green-100/80 sm:text-base">
          Manage and track all your projects
        </p>
      </div>

      <button
        type="button"
        onClick={onAddProject}
        className="
          w-full
          rounded-xl
          bg-white
          px-5
          py-3
          text-sm
          font-semibold
          text-green-700
          shadow-lg
          transition
          delay-100
          hover:-translate-y-0.5
          hover:bg-green-50
          sm:w-auto
          dark:bg-gray-900
          dark:text-green-300
          dark:hover:bg-green-950
        "
      >
        + Add Project
      </button>
    </section>
  );
}

export default ProjectsHeader;