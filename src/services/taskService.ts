import api from "./api";
import type { Task } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks");

  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);

  return response.data;
};

export const createTask = async (
  task: Omit<Task, "id">
): Promise<Task> => {
  const response = await api.post<Task>("/tasks", task);

  return response.data;
};

export const updateTask = async (
  id: string,
  task: Omit<Task, "id">
): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, task);

  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};