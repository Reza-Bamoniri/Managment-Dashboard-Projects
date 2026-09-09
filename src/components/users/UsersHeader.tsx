import { FiPlus } from "react-icons/fi";

type UsersHeaderProps = {
  onAddUser: () => void;
};

function UsersHeader({
  onAddUser,
}: UsersHeaderProps) {
  return (
    <header
      className="
        flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      <div>
        <h1
          className="
            text-2xl font-bold
            text-gray-900 dark:text-white
          "
        >
          Users
        </h1>

        <p
          className="
            mt-1 text-sm
            text-gray-500 dark:text-gray-400
          "
        >
          Manage team members and their information.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddUser}
        className="
          inline-flex w-fit cursor-pointer
          items-center gap-2 rounded-xl
          bg-green-600 px-4 py-2.5
          text-sm font-semibold text-white
          transition hover:bg-green-700
          dark:bg-green-500
          dark:hover:bg-green-600
        "
      >
        <FiPlus size={18} />
        Add User
      </button>
    </header>
  );
}

export default UsersHeader;