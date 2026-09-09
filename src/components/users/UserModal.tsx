import { FiX } from "react-icons/fi";

import UserForm from "./UserForm";

import type { User } from "../../types/user";
import type { UserFormData } from "./UserForm";

type UserModalProps = {
  user?: User | null;
  onSubmit: (data: UserFormData) => void;
  onClose: () => void;
  isSubmitting: boolean;
  mode?: "create" | "edit-user" | "edit-profile";
};

function UserModal({ user, onSubmit, onClose, isSubmitting, mode = user ? "edit-user" : "create", }: UserModalProps) {
  
    

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 p-4 backdrop-blur-sm
      "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          max-h-[90vh] w-full max-w-xl overflow-y-auto
          rounded-2xl bg-white p-6 shadow-2xl
          dark:bg-gray-900
        "
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {mode === "create" ? "Create User" : mode === "edit-profile" ? "Edit Profile" : "Edit User"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {mode === "create" ? "Create a new user" : mode === "edit-profile"
                ? "Update your profile information": "Update user information"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              cursor-pointer rounded-lg p-2
              text-gray-500 transition
              hover:bg-gray-100 hover:text-gray-700
              dark:text-gray-400 dark:hover:bg-gray-800
              dark:hover:text-gray-200
            "
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <UserForm mode={mode} user={user} onSubmit={onSubmit} onCancel={onClose} isSubmitting={isSubmitting}/>
      </div>
    </div>
  );
}

export default UserModal;