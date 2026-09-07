function WelcomeSection() {
  return (
    <section
      className="
        rounded-3xl
        bg-linear-to-r
        from-green-900
        via-green-700
        to-green-500
        p-6
        shadow-2xl
        sm:p-8
        dark:from-gray-950
        dark:via-green-950
        dark:to-green-800
      "
    >
      <h1 className="text-2xl font-bold text-white sm:text-3xl">
        Project Management Dashboard
      </h1>

      <p className="mt-3 text-lg font-medium text-green-50">
        Welcome back, James!
      </p>

      <p className="mt-1 text-sm text-green-100/80">
        Here is what's happening with your projects today.
      </p>
    </section>
  );
}

export default WelcomeSection;