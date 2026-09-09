import { toast } from "sonner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

import { deleteProjectThunk } from "../../../features/projects/projectsSlice";
import useProjectDetails from "../../../hooks/useProjectDetails";
import { useAppDispatch } from "../../../store/hooks";

import ProjectComments from "./ProjectComments";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectInfo from "./ProjectInfo";
import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";
import useProjectEdit from "../../../hooks/useProjectEdit";
import ProjectModal from "../ProjectModal";

const ProjectDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    project,
    projectMembers,
    projectManager,
    projectTasks,
    projectComments,
    loading,
    error,
  } = useProjectDetails();



  const {
  isEditModalOpen,
  openEditModal,
  closeEditModal,
  updateProject,
} = useProjectEdit(project);




  const handleDelete = async () => {
    if (!project) return;

    const isDarkMode =
      document.documentElement.classList.contains("dark");

    const result = await Swal.fire({
      title: "Delete project?",
      text: `Are you sure you want to delete "${project.name}"?`,
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

    if (!result.isConfirmed) return;

    try {
      await dispatch(
        deleteProjectThunk(project.id)
      ).unwrap();
        
      navigate("/projects")
      setTimeout(() => {
        toast.success("Project deleted successfully.")
        
      }, 200);
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-green-500 py-90 text-center text-2xl font-bold text-pink-600">
        {error}
      </div>
    );
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="space-y-6 rounded-3xl bg-linear-to-r from-gray-400 via-green-200 to-gray-700 p-6 shadow-2xl dark:to-gray-700 dark:via-green-950  dark:from-green-400">
      <ProjectDetailsHeader
        project={project}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <ProjectInfo project={project} />

      <ProjectMembers
        users={projectMembers}
        manager={projectManager}
      />

      <ProjectTasks tasks={projectTasks} />

      <ProjectComments comments={projectComments} />

      {isEditModalOpen && (<ProjectModal project={project} onClose={closeEditModal} onSubmit={updateProject}/>)}


    </div>
  );
};

export default ProjectDetails;