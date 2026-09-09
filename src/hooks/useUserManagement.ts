import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useAppDispatch } from "../store/hooks";
import {createUserThunk, deleteUserThunk, updateUserThunk} from "../features/users/usersSlice";

import type { User } from "../types/user";
import type { UserFormData } from "../components/users/UserForm";

function useUserManagement() {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openCreateModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (data: UserFormData) => {
    try {
      if (selectedUser) {
        await dispatch(
          updateUserThunk({
            id: selectedUser.id,
            user: data,
          })
        ).unwrap();
        toast.success("User updated successfully");
      } else {
        await dispatch(createUserThunk(data)).unwrap();
        toast.success("User created successfully");
      }

      closeModal();
    } catch (error) {
      console.error("Failed to save user:", error);
      toast.error(selectedUser ? "Failed to update user" : "Failed to create user");
    }
  };


  const handleDelete = async (user: User) => {
    const isDarkMode = document.documentElement.classList.contains("dark");
  const result = await Swal.fire({
    title: "Delete user?",
    text: `Are you sure you want to delete ${user.name}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,

    background: isDarkMode ? "#111827" : "#ffffff",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",

      buttonsStyling: false,

    customClass: {
        confirmButton:
          "cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 ml-3 text-sm font-semibold text-white hover:bg-red-700",

        cancelButton:
          "cursor-pointer ml-2 rounded-xl bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
      },
  });

  if (!result.isConfirmed) return;

  try {
    await dispatch(deleteUserThunk(user.id)).unwrap();

    toast.success("User deleted successfully");
  } catch (error) {
    console.error("Failed to delete user:", error);

    toast.error("Failed to delete user");
  }
};




  return {
    isModalOpen,
    selectedUser,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete
  };
}

export default useUserManagement;