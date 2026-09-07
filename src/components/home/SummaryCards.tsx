import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers } from "../../features/users/usersSlice";

function SummaryCards() {
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector(
    (state) => state.projects
  );

  const { tasks } = useAppSelector(
    (state) => state.tasks
  );

  const { users } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalProjects = projects.length;

  const activeTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const teamMembers = users.filter(
    (user) => user.status === "active"
  ).length;

  return (
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div
      className="
        rounded-2xl
        bg-white
        p-5
        shadow-2xl
        transition
        hover:-translate-y-0.5
        dark:bg-gray-900
        dark:shadow-black/40
      "
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Projects
      </p>

      <p className="mt-2 text-3xl font-bold text-green-800 dark:text-green-400">
        {totalProjects}
      </p>

      <p className="mt-1 text-xs text-green-600 dark:text-green-500">
        Active projects
      </p>
    </div>

    <div
      className="
        rounded-2xl
        bg-white
        p-5
        shadow-2xl
        transition
        hover:-translate-y-0.5
        dark:bg-gray-900
        dark:shadow-black/40
      "
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Active Tasks
      </p>

      <p className="mt-2 text-3xl font-bold text-green-800 dark:text-green-400">
        {activeTasks}
      </p>

      <p className="mt-1 text-xs text-green-600 dark:text-green-500">
        Currently in progress
      </p>
    </div>

    <div
      className="
        rounded-2xl
        bg-white
        p-5
        shadow-2xl
        transition
        hover:-translate-y-0.5
        dark:bg-gray-900
        dark:shadow-black/40
      "
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Completed Tasks
      </p>

      <p className="mt-2 text-3xl font-bold text-green-800 dark:text-green-400">
        {completedTasks}
      </p>

      <p className="mt-1 text-xs text-green-600 dark:text-green-500">
        Successfully completed
      </p>
    </div>

    <div
      className="
        rounded-2xl
        bg-white
        p-5
        shadow-2xl
        transition
        hover:-translate-y-0.5
        dark:bg-gray-900
        dark:shadow-black/40
      "
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Team Members
      </p>

      <p className="mt-2 text-3xl font-bold text-green-800 dark:text-green-400">
        {teamMembers}
      </p>

      <p className="mt-1 text-xs text-green-600 dark:text-green-500">
        Active team members
      </p>
    </div>
  </section>
);
}

export default SummaryCards;