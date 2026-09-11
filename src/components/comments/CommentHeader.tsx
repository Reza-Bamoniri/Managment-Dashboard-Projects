function CommentHeader() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
      <h1 className="inline-block
              bg-linear-to-r
              from-green-800
              to-green-400
              bg-clip-text
              text-3xl
              font-bold
              text-transparent
              dark:from-lime-300
              dark:via-green-400
              dark:to-green-600">
        Comments
      </h1>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Create and manage comments for your projects.
      </p>
    </div>
  );
}

export default CommentHeader;