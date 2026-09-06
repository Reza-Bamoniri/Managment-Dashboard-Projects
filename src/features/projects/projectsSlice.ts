import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../../types/project";
import { getProjects } from "../../services/projectService";

type ProjectsState = {
  projects: Project[];
};

const initialState: ProjectsState = {
  projects: [],
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
});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;