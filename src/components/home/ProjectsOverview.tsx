import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProjects } from "../../features/projects/projectsSlice";

function ProjectsOverview() {
  const dispatch = useAppDispatch();

  const { projects, loading, error } = useAppSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Projects Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your current projects
        </p>
      </div>

      {loading && (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading projects...
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-500">
          No projects found.
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-2xl hover:bg-green-100 transition delay-100 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {project.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {project.status}
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Progress
                  </span>

                  <span className="font-medium text-gray-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Deadline: {project.deadline}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectsOverview;