import api from "./api";
import type { Project } from "../types/project";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>("/projects");

  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get<Project>(`/projects/${id}`);

  return response.data;
};

export const createProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  const response = await api.post<Project>("/projects", project);

  return response.data;
};

export const updateProject = async (
  id: string,
  project: Omit<Project, "id">
): Promise<Project> => {
  const response = await api.put<Project>(`/projects/${id}`, project);

  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};