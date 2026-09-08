import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProjectById } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";

function useProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedProject, loading, error } = useAppSelector(
    (state) => state.projects
  );

  const users = useAppSelector(
    (state) => state.users.users
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(fetchUsers());
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
    loading,
    error,
  };
}

export default useProjectDetails;