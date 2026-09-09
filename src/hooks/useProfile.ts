import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUserThunk } from "../features/users/usersSlice";
import type { UserFormData } from "../components/users/UserForm";
import { logout } from "../features/auth/authSlice";

function useProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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


  const handleLogout = () => {
  dispatch(logout());
  navigate("/login", { replace: true });
};

  return {
    user,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleEditProfile,
    isUpdating: updating,
    handleLogout,
  };
}

export default useProfile;