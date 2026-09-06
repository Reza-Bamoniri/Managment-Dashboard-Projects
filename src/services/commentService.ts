import api from "./api";
import type { Comment } from "../types/comment";

export const getComments = async (): Promise<Comment[]> => {
  const response = await api.get<Comment[]>("/comments");

  return response.data;
};

export const getCommentById = async (id: string): Promise<Comment> => {
  const response = await api.get<Comment>(`/comments/${id}`);

  return response.data;
};

export const createComment = async (
  comment: Omit<Comment, "id">
): Promise<Comment> => {
  const response = await api.post<Comment>("/comments", comment);

  return response.data;
};

export const updateComment = async (
  id: string,
  comment: Omit<Comment, "id">
): Promise<Comment> => {
  const response = await api.put<Comment>(`/comments/${id}`, comment);

  return response.data;
};

export const deleteComment = async (id: string): Promise<void> => {
  await api.delete(`/comments/${id}`);
};