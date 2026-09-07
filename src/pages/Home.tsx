import WelcomeSection from "../components/home/WelcomeSection";
import SummaryCards from "../components/home/SummaryCards";
import TaskActivityChart from "../components/home/TaskActivityChart";
import ProjectsOverview from "../components/home/ProjectsOverview";
import RecentTasks from "../components/home/RecentTasks";
import UpcomingDeadlines from "../components/home/UpcomingDeadlines";
import RecentComments from "../components/home/RecentComments";

function Home() {
  return (
    <div className="min-h-full space-y-6 dark:bg-gray-950">
      <WelcomeSection />

      <SummaryCards />

      <TaskActivityChart />

      <ProjectsOverview />

      <RecentTasks />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingDeadlines />

        <RecentComments />
      </section>
    </div>
  );
}

export default Home;