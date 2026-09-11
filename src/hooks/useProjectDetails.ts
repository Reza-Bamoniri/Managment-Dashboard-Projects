import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProjectById, updateProjectThunk } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchTasks } from "../features/tasks/tasksSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import { toast } from "sonner";

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
};
}

export default useProjectDetails;