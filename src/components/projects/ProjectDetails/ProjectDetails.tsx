import useProjectDetails from "../../../hooks/useProjectDetails";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectInfo from "./ProjectInfo";

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
    <div>
      <ProjectDetailsHeader project={project} />

      <ProjectInfo project={project} />
    </div>
  );
};

export default ProjectDetails;
