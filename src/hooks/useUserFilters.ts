import { useMemo, useState } from "react";

import type { User } from "../types/user";

export type UserStatus = "all" | "active" | "inactive";

function useUserFilters(users: User[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus>("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "all" || user.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, status]);

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  return {
    search,
    status,
    filteredUsers,
    setSearch,
    setStatus,
    clearFilters,
  };
}

export default useUserFilters;