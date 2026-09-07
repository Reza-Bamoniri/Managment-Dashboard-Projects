function Home() {
  const stats = [
    {
      title: "Total Projects",
      value: 12,
    },
    {
      title: "Active Tasks",
      value: 24,
    },
    {
      title: "Team Members",
      value: 8,
    },
    {
      title: "Completed Tasks",
      value: 36,
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, James
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your projects today.
        </p>
      </div>

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
    </section>
  );
}

export default Home;