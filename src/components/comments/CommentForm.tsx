function CommentForm() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Create Comment
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a new comment to one of your projects.
        </p>
      </div>

      <form className="space-y-5">
        {/* Project */}
        <div>
          <label
            htmlFor="project"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Project
          </label>

          <select
            id="project"
            className="w-full cursor-pointer rounded-xl border-0 bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            defaultValue=""
          >
            <option value="" disabled>
              Select a project
            </option>

            <option value="1">Website Redesign</option>
            <option value="2">Mobile App</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Comment
          </label>

          <textarea
            id="comment"
            rows={5}
            placeholder="Write your comment..."
            className="w-full resize-none rounded-xl border-0 bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-linear-to-r from-lime-400 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
          >
            Create Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;