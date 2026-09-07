import { useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTasks } from "../../features/tasks/tasksSlice";

function TaskActivityChart() {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const chartData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return days.map((day, index) => {
      const count = tasks.filter((task) => {
        if (!task.completedAt || task.status !== "completed") {
          return false;
        }

        const date = new Date(task.completedAt);

        // 0 = Sunday, so convert it to Monday-based index
        const dayIndex = (date.getDay() + 6) % 7;

        return dayIndex === index;
      }).length;

      return {
        name: day,
        tasks: count,
      };
    });
  }, [tasks]);

  return (
    <section className="
    rounded-2xl
    bg-white
    p-5
    shadow-2xl
    sm:p-6
    dark:bg-gray-900
    dark:shadow-black/40
  ">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-green-950 dark:text-green-300">
          Task Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
  );
}

export default TaskActivityChart;