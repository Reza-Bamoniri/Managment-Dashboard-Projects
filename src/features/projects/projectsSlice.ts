import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../../types/project";
import { getProjects } from "../../services/projectService";

type ProjectsState = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};


export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const projects = await getProjects();

    return projects;
  }
);


const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );

      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
  builder
    .addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    })

    .addCase(fetchProjects.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch projects";
    });
},

});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;