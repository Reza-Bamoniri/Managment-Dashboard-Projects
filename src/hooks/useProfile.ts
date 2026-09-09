import { useState } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUserThunk } from "../features/users/usersSlice";

import type { UserFormData } from "../components/users/UserForm";

function useProfile() {
  const dispatch = useAppDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const user = useAppSelector((state) =>
    state.users.users.find((user) => user.id === "1")
  );

  const updating = useAppSelector(
    (state) => state.users.updating
  );

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditProfile = async (data: UserFormData) => {
    if (!user) return;

    try {
      await dispatch(
        updateUserThunk({
          id: user.id,
          user: data,
        })
      ).unwrap();

      toast.success("Profile updated successfully");
      closeEditModal();
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error("Failed to update profile");
    }
  };

  return {
    user,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleEditProfile,
    isUpdating: updating,
  };
}

export default useProfile;