import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { UserRole, User } from "../../types/user";

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  role: z.enum([
    "Project Manager",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "QA Engineer",
    "Product Manager",
    "Business Analyst",
  ]),

  status: z.enum(["active", "inactive"]),

  avatar: z.string(),
});

export type UserFormData = z.infer<typeof userSchema>;

type UserFormProps = {
  user?: User | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
};

const roles: UserRole[] = [
  "Project Manager",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Product Manager",
  "Business Analyst",
];

function UserForm({ user, onSubmit, onCancel, isSubmitting}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "Frontend Developer",
      status: user?.status ?? "active",
      avatar: user?.avatar ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="
            mb-2 block text-sm font-medium
            text-gray-700 dark:text-gray-300
          "
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          {...register("name")}
          className="
            w-full rounded-xl border
            border-gray-200 bg-white
            px-4 py-2.5 text-sm
            text-gray-800 outline-none
            transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-gray-200
          "
          placeholder="Enter user name"
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="
            mb-2 block text-sm font-medium
            text-gray-700 dark:text-gray-300
          "
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          {...register("email")}
          className="
            w-full rounded-xl border
            border-gray-200 bg-white
            px-4 py-2.5 text-sm
            text-gray-800 outline-none
            transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-gray-200
          "
          placeholder="Enter email address"
        />

        {errors.email && (
          <p className="mt-1 text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="
            mb-2 block text-sm font-medium
            text-gray-700 dark:text-gray-300
          "
        >
          Role
        </label>

        <select
          id="role"
          {...register("role")}
          className="
            w-full cursor-pointer rounded-xl border
            border-gray-200 bg-white
            px-4 py-2.5 text-sm
            text-gray-800 outline-none
            transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-gray-200
          "
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="
            mb-2 block text-sm font-medium
            text-gray-700 dark:text-gray-300
          "
        >
          Status
        </label>

        <select
          id="status"
          {...register("status")}
          className="
            w-full cursor-pointer rounded-xl border
            border-gray-200 bg-white
            px-4 py-2.5 text-sm
            text-gray-800 outline-none
            transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-gray-200
          "
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Avatar URL */}
      <div>
        <label
          htmlFor="avatar"
          className="
            mb-2 block text-sm font-medium
            text-gray-700 dark:text-gray-300
          "
        >
          Avatar URL
        </label>

        <input
          id="avatar"
          type="text"
          {...register("avatar")}
          className="
            w-full rounded-xl border
            border-gray-200 bg-white
            px-4 py-2.5 text-sm
            text-gray-800 outline-none
            transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-gray-200
          "
          placeholder="Enter avatar URL"
        />
      </div>

      {/* Actions */}
      <div
        className="
          flex justify-end gap-3
          border-t border-gray-100 pt-5
          dark:border-gray-800
        "
      >
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onCancel}
          className="
            cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium
            text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300
            dark:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            cursor-pointer rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white
            transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
          {isSubmitting ? user ? "Updating..." : "Creating..." : user ? "Update User" : "Create User"}
       </button>
      </div>
    </form>
  );
}

export default UserForm;