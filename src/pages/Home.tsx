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

const recentTasks = [
  {
    id: "1",
    title: "Create Navbar",
    project: "Website Redesign",
    status: "To Do",
    priority: "High",
    deadline: "Sep 12, 2026",
  },
  {
    id: "2",
    title: "Design Dashboard",
    project: "Website Redesign",
    status: "In Progress",
    priority: "High",
    deadline: "Sep 14, 2026",
  },
  {
    id: "3",
    title: "Implement Authentication",
    project: "Mobile Application",
    status: "To Do",
    priority: "Medium",
    deadline: "Sep 20, 2026",
  },
];

const upcomingDeadlines = [
  {
    id: "1",
    title: "Create Navbar",
    type: "Task",
    deadline: "Sep 12, 2026",
  },
  {
    id: "2",
    title: "Design Dashboard",
    type: "Task",
    deadline: "Sep 14, 2026",
  },
  {
    id: "3",
    title: "Website Redesign",
    type: "Project",
    deadline: "Sep 20, 2026",
  },
];

const recentComments = [
  {
    id: "1",
    user: "Emma Wilson",
    comment: "The new design looks great.",
    project: "Website Redesign",
    time: "1 hour ago",
  },
  {
    id: "2",
    user: "Sophia Miller",
    comment: "I have finished the initial layout.",
    project: "Website Redesign",
    time: "2 hours ago",
  },
  {
    id: "3",
    user: "James Anderson",
    comment: "Can we review the navbar before Friday?",
    project: "Website Redesign",
    time: "3 hours ago",
  },
];

function Home() {
  return (
    <div className="min-h-full space-y-6 bg-linear-to-br from-green-50/70 via-white to-lime-50/40">
      {/* Welcome */}
      <section className="rounded-3xl bg-linear-to-r from-green-900 via-green-700 to-green-500 p-6 shadow-lg sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-lime-300">
            Project Management Dashboard
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Welcome back, James!
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/75">
            Here is what's happening with your projects today.
          </p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-gray-500">Total Projects</p>

          <p className="mt-2 text-3xl font-bold text-green-800">
            12
          </p>

          <p className="mt-1 text-xs text-green-600">
            Active projects
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-gray-500">Active Tasks</p>

          <p className="mt-2 text-3xl font-bold text-green-800">
            28
          </p>

          <p className="mt-1 text-xs text-green-600">
            Currently in progress
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-gray-500">Completed Tasks</p>

          <p className="mt-2 text-3xl font-bold text-green-800">
            64
          </p>

          <p className="mt-1 text-xs text-green-600">
            Successfully completed
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-2xl transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-gray-500">Team Members</p>

          <p className="mt-2 text-3xl font-bold text-green-800">
            8
          </p>

          <p className="mt-1 text-xs text-green-600">
            Active team members
          </p>
        </div>
      </section>

      {/* Task Activity */}
      <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-green-950">
            Task Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Tasks completed during the week
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                strokeOpacity={0.4}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-green-950">
              Projects Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current project progress
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-green-50/50 p-4 shadow-sm transition hover:bg-green-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium text-green-950">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Deadline: {project.deadline}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {project.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>

                  <span className="font-semibold text-green-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-green-100">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-lime-400 to-green-600"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Tasks */}
      <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-green-950">
              Recent Tasks
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest tasks across your projects
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="text-sm text-gray-400">
                <th className="pb-3 font-medium">Task</th>
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium">Deadline</th>
              </tr>
            </thead>

            <tbody>
              {recentTasks.map((task) => (
                <tr
                  key={task.id}
                  className="transition hover:bg-green-50/50"
                >
                  <td className="py-4 text-sm font-medium text-green-950">
                    {task.title}
                  </td>

                  <td className="py-4 text-sm text-gray-600">
                    {task.project}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {task.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-medium text-lime-800">
                      {task.priority}
                    </span>
                  </td>

                  <td className="py-4 text-sm text-gray-600">
                    {task.deadline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upcoming Deadlines + Recent Comments */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <div className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-green-950">
                Upcoming Deadlines
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Things that need your attention
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl bg-green-50/60 p-4 shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium text-green-950">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.type}
                  </p>
                </div>

                <span className="whitespace-nowrap rounded-lg bg-white px-3 py-2 text-xs font-semibold text-green-700 shadow-sm">
                  {item.deadline}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-green-950">
                Recent Comments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest team activity
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentComments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-xl bg-green-50/60 p-4 shadow-sm transition hover:bg-green-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-green-950">
                    {comment.user}
                  </p>

                  <span className="whitespace-nowrap text-xs text-gray-400">
                    {comment.time}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-5 text-gray-600">
                  {comment.comment}
                </p>

                <p className="mt-2 text-xs font-medium text-green-600">
                  {comment.project}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;