import { useState } from "react";

import { useAppDispatch } from "../store/hooks";
import {
  createUserThunk,
  deleteUserThunk,
  updateUserThunk,
} from "../features/users/usersSlice";

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
      } else {
        await dispatch(createUserThunk(data)).unwrap();
      }

      closeModal();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };


  const handleDelete = async (user: User) => {
  try {
    await dispatch(deleteUserThunk(user.id)).unwrap();
  } catch (error) {
    console.error("Failed to delete user:", error);
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