export type ProjectStatus = "planning" | "in-progress" | "completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  managerId: string;
  memberIds: string[];
};