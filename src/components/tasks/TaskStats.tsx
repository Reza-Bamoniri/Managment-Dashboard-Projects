import { useAppSelector } from "../../store/hooks";

function TaskStats() {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
    },
    {
      label: "To Do",
      value: todoTasks,
    },
    {
      label: "In Progress",
      value: inProgressTasks,
    },
    {
      label: "Completed",
      value: completedTasks,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            rounded-2xl bg-white p-5 shadow-2xl
            dark:bg-gray-900 dark:shadow-black/40
          "
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stat.label}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}

export default TaskStats;