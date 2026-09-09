import { useEffect } from "react";

import UsersHeader from "../components/users/UsersHeader";
import UserStats from "../components/users/UserStats";
import UserFilters from "../components/users/UserFilters";
import UsersTable from "../components/users/UsersTable";
import UsersPagination from "../components/users/UsersPagination";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../features/users/usersSlice";

function Users() {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <UsersHeader />

      <UserStats />

      <UserFilters />

      <UsersTable users={users} />

      <UsersPagination />
    </div>
  );
}

export default Users;