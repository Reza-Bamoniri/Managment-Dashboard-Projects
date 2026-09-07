import { useAppSelector } from "../../store/hooks";

function ProjectStats() {
  const { projects } = useAppSelector(
    (state) => state.projects
  );

  const totalProjects = projects.length;

  const planningProjects = projects.filter(
    (project) => project.status === "planning"
  ).length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "in-progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length;

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      description: "All projects",
    },
    {
      title: "Planning",
      value: planningProjects,
      description: "Projects in planning",
    },
    {
      title: "In Progress",
      value: inProgressProjects,
      description: "Currently active",
    },
    {
      title: "Completed",
      value: completedProjects,
      description: "Successfully completed",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-2xl
            transition
            delay-100
            hover:-translate-y-0.5
            hover:bg-green-100
            dark:bg-gray-900
            dark:shadow-black/40
            dark:hover:bg-green-950/70
          "
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stat.title}
          </p>

          <p className="mt-2 text-3xl font-bold text-green-800 dark:text-green-400">
            {stat.value}
          </p>

          <p className="mt-1 text-xs text-green-600 dark:text-green-500">
            {stat.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default ProjectStats;