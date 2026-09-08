import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProjectById } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchTasks } from "../features/tasks/tasksSlice";

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



  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(fetchUsers());
      dispatch(fetchTasks());
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

  return {
  project: selectedProject,
  projectMembers,
  projectManager,
  projectTasks,
  loading,
  error,
};
}

export default useProjectDetails;