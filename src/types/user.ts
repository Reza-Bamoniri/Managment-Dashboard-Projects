export type UserRole =
  | "Project Manager"
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "UI/UX Designer"
  | "DevOps Engineer"
  | "QA Engineer"
  | "Product Manager"
  | "Business Analyst";

export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: UserStatus;
};