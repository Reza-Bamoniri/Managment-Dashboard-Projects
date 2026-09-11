import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProjectById, updateProjectThunk } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchTasks } from "../features/tasks/tasksSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import { toast } from "sonner";
import Swal from "sweetalert2";

function useProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedProject, loading, error } = useAppSelector(
    (state) => state.projects
  );

  const users = useAppSelector(
    (state) => state.users.users
  );


  const tasks = useAppSelector(
  (state) => state.tasks.tasks
);

const projectTasks = selectedProject
  ? tasks.filter(
      (task) => task.projectId === selectedProject.id
    )
  : [];




  const comments = useAppSelector(
  (state) => state.comments.comments
);


const usersById = new Map(
  users.map((user) => [user.id, user])
);


const projectComments = selectedProject
  ? comments
      .filter(
        (comment) => comment.projectId === selectedProject.id
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .map((comment) => ({
        ...comment,
        user: usersById.get(comment.userId),
      }))
  : [];





  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(fetchUsers());
      dispatch(fetchTasks());
      dispatch(fetchComments());
    }
  }, [dispatch, id]);


  




  const projectMembers = selectedProject
    ? users.filter((user) =>
        selectedProject.memberIds.includes(user.id)
      )
    : [];

  const projectManager = selectedProject
    ? users.find(
        (user) => user.id === selectedProject.managerId
      )
    : undefined;



    const addMember = async (userId: string) => {
  if (!selectedProject) return;

  if (selectedProject.memberIds.includes(userId)) {
    toast.error("This user is already a project member.");
    return;
  }

  try {
    await dispatch(
      updateProjectThunk({
        id: selectedProject.id,
        project: {
          name: selectedProject.name,
          description: selectedProject.description,
          status: selectedProject.status,
          progress: selectedProject.progress,
          deadline: selectedProject.deadline,
          managerId: selectedProject.managerId,
          memberIds: [
            ...selectedProject.memberIds,
            userId,
          ],
        },
      })
    ).unwrap();

    toast.success("Member added successfully.");
  } catch (error) {
    console.error("Failed to add member:", error);
    toast.error("Failed to add member.");
  }
};



const removeMember = async (userId: string) => {
  if (!selectedProject) return;

  const user = users.find((user) => user.id === userId);

  if (!user) return;

  const isDarkMode =
    document.documentElement.classList.contains("dark");

  const result = await Swal.fire({
    title: "Remove member?",
    text: `Are you sure you want to remove ${user.name} from this project?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Remove",
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
      updateProjectThunk({
        id: selectedProject.id,
        project: {
          name: selectedProject.name,
          description: selectedProject.description,
          status: selectedProject.status,
          progress: selectedProject.progress,
          deadline: selectedProject.deadline,
          managerId: selectedProject.managerId,
          memberIds: selectedProject.memberIds.filter(
            (id) => id !== userId
          ),
        },
      })
    ).unwrap();

    toast.success("Member removed successfully.");
  } catch (error) {
    console.error("Failed to remove member:", error);
    toast.error("Failed to remove member.");
  }
};





  return {
  project: selectedProject,
  projectMembers,
  projectManager,
  projectTasks,
  projectComments,
  loading,
  error,
  addMember,
  users,
  removeMember,
};
}

export default useProjectDetails;