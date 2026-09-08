import useProjectDetails from "../../../hooks/useProjectDetails";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectInfo from "./ProjectInfo";
import ProjectMembers from "./ProjectMembers";

const ProjectDetails = () => {
  const {
  project,
  projectMembers,
  projectManager,
  loading,
  error,
} = useProjectDetails();

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

      <ProjectMembers users={projectMembers} manager={projectManager}/>
    </div>
  );
};

export default ProjectDetails;
