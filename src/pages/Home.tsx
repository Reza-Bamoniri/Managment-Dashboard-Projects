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
    <div className="space-y-6">
      {/* Welcome */}
      <section>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, James!
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here is what's happening with your projects today.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Total Projects</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">12</p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Active Tasks</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">28</p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Completed Tasks</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">64</p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Team Members</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">8</p>
        </div>
      </section>

      {/* Task Activity */}
      <section className="rounded-xl border bg-white p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Task Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Tasks completed during the week
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="tasks"
                stroke="currentColor"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="rounded-xl border bg-white p-6">
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

        <div className="space-y-4">
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
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>

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
      </section>

      {/* Recent Tasks */}
      <section className="rounded-xl border bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Tasks
          </h2>

          <button
            type="button"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="pb-3 font-medium">Task</th>
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium">Deadline</th>
              </tr>
            </thead>

            <tbody>
              {recentTasks.map((task) => (
                <tr key={task.id} className="border-b last:border-0">
                  <td className="py-4 text-sm font-medium text-gray-900">
                    {task.title}
                  </td>

                  <td className="py-4 text-sm text-gray-600">
                    {task.project}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {task.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
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
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Deadlines
            </h2>

            <button
              type="button"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {upcomingDeadlines.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.type}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                  {item.deadline}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Comments
            </h2>

            <button
              type="button"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentComments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-gray-900">
                    {comment.user}
                  </p>

                  <span className="whitespace-nowrap text-xs text-gray-500">
                    {comment.time}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {comment.comment}
                </p>

                <p className="mt-2 text-xs text-gray-500">
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