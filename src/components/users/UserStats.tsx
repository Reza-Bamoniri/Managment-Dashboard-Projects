import { FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";

import { useAppSelector } from "../../store/hooks";

function UserStats() {
  const users = useAppSelector((state) => state.users.users);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "inactive"
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FiUsers,
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: FiUserCheck,
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: FiUserX,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              rounded-2xl bg-white p-5 shadow-2xl
              dark:bg-gray-900 dark:shadow-black/40
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>

              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl bg-green-100
                  dark:bg-green-500/10
                "
              >
                <Icon
                  size={21}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default UserStats;