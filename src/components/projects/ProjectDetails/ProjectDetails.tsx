import useProjectDetails from "../../../hooks/useProjectDetails";
import ProjectDetailsHeader from "./ProjectDetailsHeader";

const ProjectDetails = () => {
  const { project, loading, error } = useProjectDetails();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="space-y-6">
      <ProjectDetailsHeader project={project} />
    </div>
  );
};

export default ProjectDetails;
