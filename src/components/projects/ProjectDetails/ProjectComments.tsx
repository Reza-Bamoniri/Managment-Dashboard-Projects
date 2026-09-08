import type { Comment } from "../../../types/comment";
import type { User } from "../../../types/user";

type ProjectComment = Comment & {
  user?: User;
};

type ProjectCommentsProps = {
  comments: ProjectComment[];
};

function ProjectComments({
  comments,
}: ProjectCommentsProps) {
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
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Recent Comments
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {comments.length} comments in this project
        </p>
      </div>

      {comments.length === 0 ? (
        <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center dark:bg-gray-950">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No comments found for this project.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="
                flex
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
              {comment.user?.avatar ? (
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div
                  className="
                    flex
                    h-10
                    w-10
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
                  {comment.user?.name.charAt(0).toUpperCase() ?? "?"}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {comment.user?.name ?? "Unknown User"}
                  </p>

                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {comment.createdAt}
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectComments;