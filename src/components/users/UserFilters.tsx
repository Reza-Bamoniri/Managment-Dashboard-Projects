import { FiSearch } from "react-icons/fi";

import type { UserStatus } from "../../hooks/useUserFilters";

type UserFiltersProps = {
  search: string;
  status: UserStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: UserStatus) => void;
};

function UserFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: UserFiltersProps) {
  return (
    <section
      className="
        flex flex-col gap-4
        rounded-2xl bg-white p-5 shadow-2xl
        dark:bg-gray-900 dark:shadow-black/40
        sm:flex-row sm:items-center
      "
    >
      {/* Search */}
      <div className="relative flex-1">
        <FiSearch
          size={18}
          className="
            pointer-events-none
            absolute left-3 top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search users..."
          className="
            w-full rounded-xl
            border border-gray-200
            bg-white py-2.5 pl-10 pr-4
            text-sm text-gray-800
            outline-none transition
            focus:border-green-500
            focus:ring-2 focus:ring-green-500/20
            dark:border-gray-700
            dark:bg-gray-950
            dark:text-gray-200
            dark:placeholder:text-gray-500
          "
        />
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(event) =>
          onStatusChange(
            event.target.value as UserStatus
          )
        }
        className="
          cursor-pointer rounded-xl
          border border-gray-200
          bg-white px-4 py-2.5
          text-sm text-gray-700
          outline-none transition
          focus:border-green-500
          focus:ring-2 focus:ring-green-500/20
          dark:border-gray-700
          dark:bg-gray-950
          dark:text-gray-300
        "
      >
        <option value="all">All Users</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </section>
  );
}

export default UserFilters;