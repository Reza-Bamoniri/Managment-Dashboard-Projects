import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/task";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../../services/taskService";

type TasksState = {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
};

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};

// GET /tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const tasks = await getTasks();
    return tasks;
  }
);

// GET /tasks/:id
export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id: string) => {
    const task = await getTaskById(id);
    return task;
  }
);

// POST /tasks
export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async (task: Omit<Task, "id">) => {
    const newTask = await createTask(task);
    return newTask;
  }
);

// PUT /tasks/:id
export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async ({
    id,
    task,
  }: {
    id: string;
    task: Omit<Task, "id">;
  }) => {
    const updatedTask = await updateTaskApi(id, task);
    return updatedTask;
  }
);

// DELETE /tasks/:id
export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await deleteTaskApi(id);
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      })

      // Fetch Task By ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })

      .addCase(fetchTaskById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch task";
      })

      // Create Task
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })

      .addCase(createTaskThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create task";
      })

      // Update Task
      .addCase(updateTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      .addCase(updateTaskThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update task";
      })

      // Delete Task
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
      })

      .addCase(deleteTaskThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete task";
      });
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;