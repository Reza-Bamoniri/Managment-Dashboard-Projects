import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "../../types/comment";

import {
  getComments,
  getCommentById,
  createComment,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../../services/commentService";

type CommentsState = {
  comments: Comment[];
  selectedComment: Comment | null;
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  selectedComment: null,
  loading: false,
  error: null,
};

// GET /comments
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const comments = await getComments();
    return comments;
  }
);

// GET /comments/:id
export const fetchCommentById = createAsyncThunk(
  "comments/fetchCommentById",
  async (id: string) => {
    const comment = await getCommentById(id);
    return comment;
  }
);

// POST /comments
export const createCommentThunk = createAsyncThunk(
  "comments/createComment",
  async (comment: Omit<Comment, "id">) => {
    const newComment = await createComment(comment);
    return newComment;
  }
);

// PUT /comments/:id
export const updateCommentThunk = createAsyncThunk(
  "comments/updateComment",
  async ({
    id,
    comment,
  }: {
    id: string;
    comment: Omit<Comment, "id">;
  }) => {
    const updatedComment = await updateCommentApi(id, comment);
    return updatedComment;
  }
);

// DELETE /comments/:id
export const deleteCommentThunk = createAsyncThunk(
  "comments/deleteComment",
  async (id: string) => {
    await deleteCommentApi(id);
    return id;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,

  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    updateComment: (state, action: PayloadAction<Comment>) => {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );

      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },

    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })

      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch comments";
      })

      // Fetch Comment By ID
      .addCase(fetchCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedComment = action.payload;
      })

      .addCase(fetchCommentById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch comment";
      })

      // Create Comment
      .addCase(createCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })

      .addCase(createCommentThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create comment";
      })

      // Update Comment
      .addCase(updateCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCommentThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );

        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })

      .addCase(updateCommentThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update comment";
      })

      // Delete Comment
      .addCase(deleteCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })

      .addCase(deleteCommentThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete comment";
      });
  },
});

export const {
  setComments,
  addComment,
  updateComment,
  deleteComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;