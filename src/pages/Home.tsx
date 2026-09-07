import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 7 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 9 },
  { name: "Fri", tasks: 6 },
  { name: "Sat", tasks: 8 },
  { name: "Sun", tasks: 10 },
];

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    status: "In Progress",
    progress: 75,
    deadline: "Sep 20, 2026",
  },
  {
    id: "2",
    name: "Mobile Application",
    status: "Planning",
    progress: 20,
    deadline: "Oct 15, 2026",
  },
];

function Home() {
  const stats = [
    { title: "Total Projects", value: 12 },
    { title: "Active Tasks", value: 24 },
    { title: "Team Members", value: 8 },
    { title: "Completed Tasks", value: 36 },
  ];

  return (
    <section className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, James
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {stat.title}
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          Weekly Task Activity
        </h2>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="tasks"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Projects Overview
          </h2>

          <button
            type="button"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            View All
          </button>
        </div>

        <div className="space-y-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Deadline: {project.deadline}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {project.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Progress
                  </span>

                  <span className="font-medium text-gray-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gray-900"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;