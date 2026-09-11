import { useState } from "react";
import type { User } from "../../../types/user";


type ProjectMembersProps = {
  users: User[];
  allUsers: User[];
  manager?: User;
  onAddMember: (userId: string) => Promise<void>;
};

function ProjectMembers({users, allUsers, onAddMember}: ProjectMembersProps) {


  const [isAdding, setIsAdding] = useState(false);

const availableUsers = allUsers.filter(
  (user) => !users.some((member) => member.id === user.id)
);

const handleAddMember = async (userId: string) => {
  await onAddMember(userId);
  setIsAdding(false);
};



  return (
    <section className="rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:shadow-black/40">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Project Members
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {users.length} members assigned to this project
          </p>
        </div>

        



        
          <div className="text-sm flex items-center gap-5 text-gray-500 dark:text-gray-400">

            <button type="button" onClick={() => setIsAdding((prev) => !prev)}
               className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
              >
             { isAdding ? ( "cancel") : "+ Add Member"}
            </button>
          </div>
        
      </div>



 {isAdding && (
  <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-950">
    {availableUsers.length === 0 ? (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        All users are already project members.
      </p>
    ) : (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Select a user
        </p>

        {availableUsers.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => handleAddMember(user.id)}
            className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition hover:bg-green-100 dark:hover:bg-green-950/70"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                {user.name}
              </p>

              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {user.role}
              </p>
            </div>
          </button>
        ))}
      </div>
    )}
  </div>
)}





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
              className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 transition delay-100 hover:-translate-y-0.5 hover:bg-green-100 dark:bg-gray-950 dark:hover:bg-green-950/70"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white dark:bg-green-700">
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