import { toast } from "sonner";
import Swal from "sweetalert2";
import { deleteProjectThunk } from "../../../features/projects/projectsSlice";
import useProjectDetails from "../../../hooks/useProjectDetails";
import { useAppDispatch } from "../../../store/hooks";
import ProjectComments from "./ProjectComments";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectInfo from "./ProjectInfo";
import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";

const ProjectDetails = () => {

const dispatch = useAppDispatch();

const handleDelete = async () => {
  const isDarkMode =
    document.documentElement.classList.contains("dark");

  const result = await Swal.fire({
    title: "Delete project?",
    text: `Are you sure you want to delete "${project?.name}"?`,
    icon: "warning",

    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,

    background: isDarkMode ? "#111827" : "#ffffff",
    color: isDarkMode ? "#e5e7eb" : "#1f2937",

    buttonsStyling: false,

    customClass: {
      confirmButton:
        "cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 ml-3 text-sm font-semibold text-white hover:bg-red-700",
      cancelButton:
        "cursor-pointer ml-2 rounded-xl bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
    },
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    if(project)
    await dispatch(
      deleteProjectThunk(project.id)
    ).unwrap();

    toast.success("Project deleted successfully.");
  } catch {
    toast.error("Failed to delete project.");
  }
};





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
    return <div className="text-2xl text-pink-600 font-bold text-center bg-green-500 py-90 ">{error}</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }



  return (
    <div>
      <ProjectDetailsHeader onEdit={() => console.log("Edit", project.id)} onDelete={handleDelete} project={project} />

      <ProjectInfo project={project} />

      <ProjectMembers users={projectMembers} manager={projectManager}/>

      <ProjectTasks tasks={projectTasks} />

      <ProjectComments comments={projectComments} />
    </div>
  );
};

export default ProjectDetails;
