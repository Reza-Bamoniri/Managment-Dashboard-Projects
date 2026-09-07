import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTasks } from "../../features/tasks/tasksSlice";

function RecentTasks() {
  const dispatch = useAppDispatch();

  const { tasks, loading, error } = useAppSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Tasks
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest tasks across your projects
        </p>
      </div>

      {loading && (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading tasks...
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-500">
          No tasks found.
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-175 w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-4 py-3 text-sm font-medium text-gray-500">
                  Task
                </th>

                <th className="px-4 py-3 text-sm font-medium text-gray-500">
                  Project
                </th>

                <th className="px-4 py-3 text-sm font-medium text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-sm font-medium text-gray-500">
                  Priority
                </th>

                <th className="px-4 py-3 text-sm font-medium text-gray-500">
                  Deadline
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-800">
                      {task.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {task.description}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {task.projectId}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {task.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-gray-700">
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {task.deadline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RecentTasks;