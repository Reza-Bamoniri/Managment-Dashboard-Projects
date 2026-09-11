import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Comment } from "../../../types/comment";

type CommentsTableProps = {
  comments: Comment[];
  getProjectName: (projectId: string) => string;
};

function CommentsTable({
  comments,
  getProjectName,
}: CommentsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175">
          <thead>
            <tr className="bg-gray-50 text-left dark:bg-gray-800/70">
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Comment
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Project
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Created At
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="max-w-xs px-6 py-4">
                  <p
                    title={comment.text}
                    className="truncate text-sm text-gray-700 dark:text-gray-300"
                  >
                    {comment.text}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {getProjectName(comment.projectId)}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      aria-label="Edit comment"
                      className="cursor-pointer rounded-lg p-2 text-green-600 transition hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/30"
                    >
                      <FiEdit2 size={17} />
                    </button>

                    <button
                      type="button"
                      aria-label="Delete comment"
                      className="cursor-pointer rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
                    >
                      <FiTrash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommentsTable;