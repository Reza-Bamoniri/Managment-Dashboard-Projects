import { FiX } from "react-icons/fi";

import UserForm from "./UserForm";

import type { User } from "../../types/user";
import type { UserFormData } from "./UserForm";

type UserModalProps = {
  user?: User | null;
  onSubmit: (data: UserFormData) => void;
  onClose: () => void;
};

function UserModal({
  user,
  onSubmit,
  onClose,
}: UserModalProps) {
  const isEditMode = Boolean(user);

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
              {isEditMode ? "Edit User" : "Create User"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update user information"
                : "Create a new user"}
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
        <UserForm
          user={user}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default UserModal;