import api from "./api";
import type { Notification } from "../types/notification";

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<Notification[]>("/notifications");

  return response.data;
};

export const getNotificationById = async (
  id: string
): Promise<Notification> => {
  const response = await api.get<Notification>(`/notifications/${id}`);

  return response.data;
};

export const createNotification = async (
  notification: Omit<Notification, "id">
): Promise<Notification> => {
  const response = await api.post<Notification>(
    "/notifications",
    notification
  );

  return response.data;
};

export const updateNotification = async (
  id: string,
  notification: Omit<Notification, "id">
): Promise<Notification> => {
  const response = await api.put<Notification>(
    `/notifications/${id}`,
    notification
  );

  return response.data;
};

export const deleteNotification = async (id: string): Promise<void> => {
  await api.delete(`/notifications/${id}`);
};