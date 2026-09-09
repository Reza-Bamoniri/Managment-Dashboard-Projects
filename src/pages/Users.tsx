import { useEffect, useState } from "react";

import UsersHeader from "../components/users/UsersHeader";
import UserStats from "../components/users/UserStats";
import UserFilters from "../components/users/UserFilters";
import UsersTable from "../components/users/table/UsersTable";
import UsersPagination from "../components/users/UsersPagination";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../features/users/usersSlice";

import useUserFilters from "../hooks/useUserFilters";
import usePagination from "../hooks/usePagination";
import UserModal from "../components/users/UserModal";




function Users() {
  const dispatch = useAppDispatch();

  const {users, loading, error,} = useAppSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedUsers,
    setCurrentPage,
  } = usePagination(filteredUsers, 5);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: "all" | "active" | "inactive"
  ) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    clearFilters();
    setCurrentPage(1);
  };


  const handleAddUser = () => {
  setIsModalOpen(true);
};




  if (loading && users.length === 0) {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="text-center">
        <div
          className="
            mx-auto h-10 w-10 animate-spin rounded-full
            border-4 border-gray-200 border-t-green-600
            dark:border-gray-700 dark:border-t-green-500
          "
        />

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading users...
        </p>
      </div>
    </div>
  );
}

if (error && users.length === 0) {
  return (
    <div
      className="
        flex min-h-100 items-center justify-center
        rounded-2xl bg-white p-8 shadow-2xl
        dark:bg-gray-900 dark:shadow-black/40
      "
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Failed to load users
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Something went wrong while loading the users.
        </p>

        <button
          type="button"
          onClick={() => dispatch(fetchUsers())}
          className="
            mt-5 cursor-pointer rounded-xl
            bg-green-600 px-5 py-2.5
            text-sm font-semibold text-white
            transition hover:bg-green-700
            dark:bg-green-500 dark:hover:bg-green-600
          "
        >
          Try Again
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="space-y-6">
       <UsersHeader onAddUser={handleAddUser} /> 

      <UserStats />

      <UserFilters
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />
            
          {users.length === 0 ? (
  <section className="rounded-2xl bg-white p-10 text-center shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
      No users yet
    </h2>

    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
      Add your first user to get started.
    </p>

    <button
      type="button"
      className="mt-5 cursor-pointer rounded-xl bg-green-600 px-5 py-2.5
        text-sm font-semibold text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
    >
      Add User
    </button>

  </section>

  ) : filteredUsers.length === 0 ? (
  
  <section className="rounded-2xl bg-white p-10 text-center shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
      No users found
    </h2>

    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
      No users match your current search or filter.
    </p>

    <button
      type="button"
      onClick={handleClearFilters}
      className="mt-5 cursor-pointer rounded-xl border border-gray-200 bg-white
        px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      Clear Filters
    </button>

  </section>
) : (
  <>
    <UsersTable users={paginatedUsers} />

    <UsersPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
  </>
)}


{isModalOpen && (<UserModal onSubmit={() => {}} onClose={() => setIsModalOpen(false)}/>)}


      
    </div>
  );
}

export default Users;