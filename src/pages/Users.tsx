import { useEffect } from "react";

import UsersHeader from "../components/users/UsersHeader";
import UserStats from "../components/users/UserStats";
import UserFilters from "../components/users/UserFilters";
import UsersTable from "../components/users/UsersTable";
import UsersPagination from "../components/users/UsersPagination";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../features/users/usersSlice";

import useUserFilters from "../hooks/useUserFilters";

function Users() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(
    (state) => state.users.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const {
    search,
    status,
    filteredUsers,
    setSearch,
    setStatus,
    clearFilters,
  } = useUserFilters(users);

  return (
    <div className="space-y-6">
      <UsersHeader />

      <UserStats />

      <UserFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {filteredUsers.length === 0 ? (
        <section
          className="
            rounded-2xl bg-white p-10 text-center shadow-2xl
            dark:bg-gray-900 dark:shadow-black/40
          "
        >
          <h2
            className="
              text-lg font-semibold
              text-gray-800 dark:text-gray-200
            "
          >
            No users found
          </h2>

          <p
            className="
              mt-2 text-sm
              text-gray-500 dark:text-gray-400
            "
          >
            No users match your current search or filter.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="
              mt-5 cursor-pointer rounded-xl
              border border-gray-200 bg-white
              px-5 py-2.5 text-sm font-medium
              text-gray-600 transition
              hover:bg-gray-100
              dark:border-gray-700
              dark:bg-gray-950
              dark:text-gray-300
              dark:hover:bg-gray-800
            "
          >
            Clear Filters
          </button>
        </section>
      ) : (
        <>
          <UsersTable users={filteredUsers} />

          <UsersPagination />
        </>
      )}
    </div>
  );
}

export default Users;