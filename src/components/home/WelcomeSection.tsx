function WelcomeSection() {
  return (
    <section className="rounded-3xl bg-linear-to-r from-green-900 via-green-700 to-green-500 p-6 shadow-2xl sm:p-8">
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
  );
}

export default WelcomeSection;