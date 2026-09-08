import type { User } from "../../../types/user";

type ProjectMembersProps = {
  users: User[];
  manager?: User;
};

function ProjectMembers({
  users,
  manager,
}: ProjectMembersProps) {
  return (
    <section
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-2xl
        dark:bg-gray-900
        dark:shadow-black/40
      "
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Project Members
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {users.length} members assigned to this project
          </p>
        </div>

        {manager && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Manager:{" "}
            <span className="font-medium text-green-700 dark:text-green-400">
              {manager.name}
            </span>
          </div>
        )}
      </div>

      {users.length === 0 ? (
        <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center dark:bg-gray-950">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No members assigned to this project.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="
                flex
                items-center
                gap-4
                rounded-xl
                bg-gray-50
                p-4
                transition
                delay-100
                hover:-translate-y-0.5
                hover:bg-green-100
                dark:bg-gray-950
                dark:hover:bg-green-950/70
              "
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-600
                    text-sm
                    font-bold
                    text-white
                    dark:bg-green-700
                  "
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {user.name}
                </p>

                <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectMembers;