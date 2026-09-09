import { FiEdit2, FiTrash2 } from "react-icons/fi";

import type { User } from "../../../types/user";

type UserRowProps = {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
};

function UserRow({
  user,
  onEdit,
  onDelete,
}: UserRowProps) {
  return (
    <tr
      className="
        border-b border-gray-100
        last:border-0
        dark:border-gray-800
      "
    >
      {/* User */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full bg-green-100
                text-sm font-semibold
                text-green-700
                dark:bg-green-500/10
                dark:text-green-400
              "
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <p
              className="
                font-medium text-gray-800
                dark:text-gray-200
              "
            >
              {user.name}
            </p>

            <p
              className="
                mt-0.5 text-xs
                text-gray-500
                dark:text-gray-400
              "
            >
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td
        className="
          whitespace-nowrap px-5 py-4
          text-sm text-gray-600
          dark:text-gray-300
        "
      >
        {user.role}
      </td>

      {/* Status */}
      <td className="whitespace-nowrap px-5 py-4">
        <span
          className={`
            inline-flex rounded-full
            px-3 py-1 text-xs font-medium
            ${
              user.status === "active"
                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }
          `}
        >
          {user.status === "active"
            ? "Active"
            : "Inactive"}
        </span>
      </td>

      {/* Operations */}
      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(user)}
            aria-label={`Edit ${user.name}`}
            className="
              cursor-pointer rounded-lg p-2
              text-gray-500 transition
              hover:bg-gray-100 hover:text-blue-600
              dark:text-gray-400
              dark:hover:bg-gray-800
              dark:hover:text-blue-400
            "
          >
            <FiEdit2 size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(user)}
            aria-label={`Delete ${user.name}`}
            className="
              cursor-pointer rounded-lg p-2
              text-gray-500 transition
              hover:bg-gray-100 hover:text-red-600
              dark:text-gray-400
              dark:hover:bg-gray-800
              dark:hover:text-red-400
            "
          >
            <FiTrash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;