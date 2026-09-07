import { useAppSelector } from "../../store/hooks";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TaskActivityChart() {
  const { tasks } = useAppSelector((state) => state.tasks);

  const chartData = [
    {
      name: "Todo",
      tasks: tasks.filter((task) => task.status === "todo").length,
    },
    {
      name: "In Progress",
      tasks: tasks.filter(
        (task) => task.status === "in-progress"
      ).length,
    },
    {
      name: "Completed",
      tasks: tasks.filter(
        (task) => task.status === "completed"
      ).length,
    },
  ];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Task Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your current task status
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TaskActivityChart;