import useProjectDetails from "../../../hooks/useProjectDetails";
import ProjectComments from "./ProjectComments";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectInfo from "./ProjectInfo";
import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";

const ProjectDetails = () => {
  const {
  project,
  projectMembers,
  projectManager,
  projectTasks,
  projectComments,
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

      <ProjectTasks tasks={projectTasks} />

      <ProjectComments comments={projectComments} />
    </div>
  );
};

export default ProjectDetails;
