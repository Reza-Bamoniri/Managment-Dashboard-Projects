import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProjects } from "../../features/projects/projectsSlice";
import { fetchTasks } from "../../features/tasks/tasksSlice";

function UpcomingDeadlines() {
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector(
    (state) => state.projects
  );

  const { tasks } = useAppSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  const upcomingDeadlines = [
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.name,
      deadline: project.deadline,
      type: "Project",
    })),

    ...tasks.map((task) => ({
      id: `task-${task.id}`,
      title: task.title,
      deadline: task.deadline,
      type: "Task",
    })),
  ]
    .filter((item) => new Date(item.deadline) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime()
    )
    .slice(0, 5);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Upcoming Deadlines
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Projects and tasks with upcoming deadlines
        </p>
      </div>

      {upcomingDeadlines.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No upcoming deadlines.
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingDeadlines.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4 shadow-2xl"
            >
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {item.type}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 shadow-2xl">
                {item.deadline}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default UpcomingDeadlines;