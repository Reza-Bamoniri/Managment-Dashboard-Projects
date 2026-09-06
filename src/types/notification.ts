export type NotificationType =
  | "task-assigned"
  | "deadline"
  | "comment";

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  userId: string;
  isRead: boolean;
  createdAt: string;
};