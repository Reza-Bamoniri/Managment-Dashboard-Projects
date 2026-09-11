import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  createCommentThunk,
  deleteCommentThunk,
  fetchComments,
  updateCommentThunk,
} from "../features/comments/commentsSlice";

import type { Comment } from "../types/comment";
import { fetchProjects } from "../features/projects/projectsSlice";

export type CommentFormData = {
  projectId: string;
  text: string;
};

function useCommentManagement() {
  const dispatch = useAppDispatch();

  const [selectedComment, setSelectedComment] =
    useState<Comment | null>(null);

  const comments = useAppSelector(
    (state) => state.comments.comments
  );

  const loading = useAppSelector(
    (state) => state.comments.loading
  );

  const error = useAppSelector(
    (state) => state.comments.error
  );

  const userId = useAppSelector(
    (state) => state.auth.userId
  );

  const projects = useAppSelector(
    (state) => state.projects.projects
  );

  useEffect(() => {
  dispatch(fetchComments());
  dispatch(fetchProjects());
}, [dispatch]);

  const getProjectName = (projectId: string) => {
    const project = projects.find(
      (project) => project.id === projectId
    );

    return project?.name ?? "Unknown Project";
  };

  const openEditComment = (comment: Comment) => {
    setSelectedComment(comment);
  };

  const closeEditComment = () => {
    setSelectedComment(null);
  };

  const handleCreate = async (
  data: CommentFormData
): Promise<boolean> => {
  if (!userId) {
    toast.error("You must be logged in to create a comment");
    return false;
  }

  try {
    await dispatch(
      createCommentThunk({
        text: data.text,
        projectId: data.projectId,
        userId,
        createdAt: new Date().toISOString(),
      })
    ).unwrap();

    toast.success("Comment created successfully");
    return true;
  } catch (error) {
    console.error("Failed to create comment:", error);
    toast.error("Failed to create comment");
    return false;
  }
};

  const handleUpdate = async (
  id: string,
  data: CommentFormData
): Promise<boolean> => {
  const existingComment = comments.find(
    (comment) => comment.id === id
  );

  if (!existingComment) {
    toast.error("Comment not found");
    return false;
  }

  try {
    await dispatch(
      updateCommentThunk({
        id,
        comment: {
          text: data.text,
          projectId: data.projectId,
          userId: existingComment.userId,
          createdAt: existingComment.createdAt,
        },
      })
    ).unwrap();

    toast.success("Comment updated successfully");
    closeEditComment();

    return true;
  } catch (error) {
    console.error("Failed to update comment:", error);
    toast.error("Failed to update comment");
    return false;
  }
};

  const handleDelete = async (comment: Comment) => {
    const isDarkMode =
      document.documentElement.classList.contains("dark");

    const result = await Swal.fire({
      title: "Delete comment?",
      text: "Are you sure you want to delete this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: isDarkMode ? "#111827" : "#ffffff",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 ml-3 text-sm font-semibold text-white hover:bg-red-700",
        cancelButton:
          "cursor-pointer ml-2 rounded-xl bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteCommentThunk(comment.id)).unwrap();

      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  return {
  comments,
  projects,
  loading,
  error,
  selectedComment,
  getProjectName,
  openEditComment,
  closeEditComment,
  handleCreate,
  handleUpdate,
  handleDelete,
};
}

export default useCommentManagement;