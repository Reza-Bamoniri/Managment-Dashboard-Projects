import type { ProjectStatus } from "../../types/project";

type ProjectFiltersProps = {
  search: string;
  status: ProjectStatus | "all";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | "all") => void;
};

function ProjectFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ProjectFiltersProps) {
  return (
    <section
      className="
        rounded-2xl
        bg-white
        p-5
        shadow-2xl
        sm:p-6
        dark:bg-gray-900
        dark:shadow-black/40
      "
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <label
            htmlFor="project-search"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Search Projects
          </label>

          <input
            id="project-search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by project name..."
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
        </div>

        <div className="w-full md:w-56">
          <label
            htmlFor="project-status"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id="project-status"
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as ProjectStatus | "all"
              )
            }
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
            <option value="all">All Statuses</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default ProjectFilters;