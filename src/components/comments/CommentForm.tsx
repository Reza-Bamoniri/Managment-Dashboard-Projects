import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { CommentFormData } from "../../hooks/useCommentManagement";
import type { Comment } from "../../types/comment";

const commentSchema = z.object({
  projectId: z.string().min(1, "Please select a project"),
  text: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});

type CommentFormProps = {
  projects: {
    id: string;
    name: string;
  }[];
  selectedComment: Comment | null;
  onSubmit: (data: CommentFormData) => Promise<boolean>;
  onCancelEdit: () => void;
};

function CommentForm({projects, onSubmit, selectedComment, onCancelEdit}: CommentFormProps) {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<CommentFormData>({
  resolver: zodResolver(commentSchema),
  defaultValues: {
    projectId: "",
    text: "",
  },
});


useEffect(() => {
  if (selectedComment) {
    reset({
      projectId: selectedComment.projectId,
      text: selectedComment.text,
    });
  } else {
    reset({
      projectId: "",
      text: "",
    });
  }
}, [selectedComment, reset]);



  const handleFormSubmit = async (data: CommentFormData) => {
  const success = await onSubmit(data);

  if (success) {
    reset();
  }
};

  return (
    <div className="rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {selectedComment ? "Edit Comment" : "Create Comment"}
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {selectedComment ? "Update the selected comment." : "Add a new comment to one of your projects."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
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
            {...register("projectId")}
            className="w-full cursor-pointer rounded-xl border-0 bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          >
            <option value="" disabled>
              Select a project
            </option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {errors.projectId && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.projectId.message}
            </p>
          )}
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
            {...register("text")}
            className="w-full resize-none rounded-xl border-0 bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
          />

          <div className="mt-1.5 flex justify-between">
            {errors.text ? (
              <p className="text-sm text-red-500">
                {errors.text.message}
              </p>
            ) : (
              <span />
            )}

            <span className="text-xs text-gray-400 dark:text-gray-500">
              Maximum 500 characters
            </span>
          </div>
        </div>

        {/* Submit */}
              
              <div className="flex justify-end gap-3">
  {selectedComment && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="cursor-pointer rounded-xl bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
     )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-xl bg-linear-to-r from-lime-400 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? selectedComment ? "Updating..." : "Creating..." : selectedComment ? "Update Comment" : "Create Comment"}
              </button>
        </div>

      </form>
    </div>
    );
  }

export default CommentForm;