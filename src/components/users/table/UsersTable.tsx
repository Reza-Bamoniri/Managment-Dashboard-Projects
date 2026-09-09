import UserRow from "./UserRow";
import type { User } from "../../../types/user";

type UsersTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <section
      className="
        overflow-hidden rounded-2xl bg-white shadow-2xl
        dark:bg-gray-900 dark:shadow-black/40
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left">
          <thead>
            <tr
              className="
                border-b border-gray-100 bg-gray-50
                dark:border-gray-800 dark:bg-gray-950
              "
            >
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                User
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Role
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
             {users.map((user) => (<UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete}/>))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UsersTable;