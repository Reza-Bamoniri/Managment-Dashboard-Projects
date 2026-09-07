import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchComments } from "../../features/comments/commentsSlice";
import { fetchUsers } from "../../features/users/usersSlice";

function RecentComments() {
  const dispatch = useAppDispatch();

  const { comments, loading, error } = useAppSelector(
    (state) => state.comments
  );

  const { users } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchUsers());
  }, [dispatch]);

  const recentComments = [...comments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Comments
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest comments from your team
        </p>
      </div>

      {loading && (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading comments...
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && recentComments.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-500">
          No comments found.
        </div>
      )}

      {!loading && !error && recentComments.length > 0 && (
        <div className="space-y-4">
          {recentComments.map((comment) => {
            const user = users.find(
              (user) => user.id === comment.userId
            );

            return (
              <div
                key={comment.id}
                className="rounded-xl bg-gray-50 p-4 shadow-2xl hover:bg-green-100 transition delay-100 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                    {user?.name?.charAt(0) ?? "U"}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {user?.name ?? "Unknown User"}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {comment.text}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {comment.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RecentComments;