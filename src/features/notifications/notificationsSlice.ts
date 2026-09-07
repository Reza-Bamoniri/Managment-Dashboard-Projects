import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "../../types/notification";

import {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification as updateNotificationApi,
  deleteNotification as deleteNotificationApi,
} from "../../services/notificationService";

type NotificationsState = {
  notifications: Notification[];
  selectedNotification: Notification | null;
  loading: boolean;
  error: string | null;
};

const initialState: NotificationsState = {
  notifications: [],
  selectedNotification: null,
  loading: false,
  error: null,
};

// GET /notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const notifications = await getNotifications();
    return notifications;
  }
);

// GET /notifications/:id
export const fetchNotificationById = createAsyncThunk(
  "notifications/fetchNotificationById",
  async (id: string) => {
    const notification = await getNotificationById(id);
    return notification;
  }
);

// POST /notifications
export const createNotificationThunk = createAsyncThunk(
  "notifications/createNotification",
  async (notification: Omit<Notification, "id">) => {
    const newNotification = await createNotification(notification);
    return newNotification;
  }
);

// PUT /notifications/:id
export const updateNotificationThunk = createAsyncThunk(
  "notifications/updateNotification",
  async ({
    id,
    notification,
  }: {
    id: string;
    notification: Omit<Notification, "id">;
  }) => {
    const updatedNotification = await updateNotificationApi(
      id,
      notification
    );

    return updatedNotification;
  }
);

// DELETE /notifications/:id
export const deleteNotificationThunk = createAsyncThunk(
  "notifications/deleteNotification",
  async (id: string) => {
    await deleteNotificationApi(id);
    return id;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<Notification[]>
    ) => {
      state.notifications = action.payload;
    },

    addNotification: (
      state,
      action: PayloadAction<Notification>
    ) => {
      state.notifications.push(action.payload);
    },

    updateNotification: (
      state,
      action: PayloadAction<Notification>
    ) => {
      const index = state.notifications.findIndex(
        (notification) =>
          notification.id === action.payload.id
      );

      if (index !== -1) {
        state.notifications[index] = action.payload;
      }
    },

    deleteNotification: (
      state,
      action: PayloadAction<string>
    ) => {
      state.notifications = state.notifications.filter(
        (notification) =>
          notification.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })

      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch notifications";
      })

      // Fetch Notification By ID
      .addCase(fetchNotificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchNotificationById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedNotification = action.payload;
        }
      )

      .addCase(fetchNotificationById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch notification";
      })

      // Create Notification
      .addCase(createNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        createNotificationThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.notifications.push(action.payload);
        }
      )

      .addCase(createNotificationThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create notification";
      })

      // Update Notification
      .addCase(updateNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        updateNotificationThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          const index = state.notifications.findIndex(
            (notification) =>
              notification.id === action.payload.id
          );

          if (index !== -1) {
            state.notifications[index] = action.payload;
          }
        }
      )

      .addCase(updateNotificationThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update notification";
      })

      // Delete Notification
      .addCase(deleteNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        deleteNotificationThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.notifications =
            state.notifications.filter(
              (notification) =>
                notification.id !== action.payload
            );
        }
      )

      .addCase(deleteNotificationThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete notification";
      });
  },
});

export const {
  setNotifications,
  addNotification,
  updateNotification,
  deleteNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;