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
      <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-2">
        <p className="text-sm text-gray-500">
          Total Projects
        </p>

        <p className="mt-2 text-3xl font-bold text-green-800">
          {totalProjects}
        </p>

        <p className="mt-1 text-xs text-green-600">
          Active projects
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-2">
        <p className="text-sm text-gray-500">
          Active Tasks
        </p>

        <p className="mt-2 text-3xl font-bold text-green-800">
          {activeTasks}
        </p>

        <p className="mt-1 text-xs text-green-600">
          Currently in progress
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-2">
        <p className="text-sm text-gray-500">
          Completed Tasks
        </p>

        <p className="mt-2 text-3xl font-bold text-green-800">
          {completedTasks}
        </p>

        <p className="mt-1 text-xs text-green-600">
          Successfully completed
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-2">
        <p className="text-sm text-gray-500">
          Team Members
        </p>

        <p className="mt-2 text-3xl font-bold text-green-800">
          {teamMembers}
        </p>

        <p className="mt-1 text-xs text-green-600">
          Active team members
        </p>
      </div>
    </section>
  );
}

export default SummaryCards;