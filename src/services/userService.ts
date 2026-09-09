import api from "./api";
import type { User, CreateUser, UpdateUser } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");

  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);

  return response.data;
};

export const createUser = async (
  user: CreateUser
): Promise<User> => {
  const response = await api.post<User>("/users", user);

  return response.data;
};

export const updateUser = async (
  id: string,
  user: UpdateUser
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);

  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};


export const loginUser = async (email: string,password: string): Promise<User | null> => {
  const response = await api.get<User[]>("/users", {params: { email },});
  const user = response.data[0];
  if (!user || user.password !== password) {
    return null;
  }
  return user;
};