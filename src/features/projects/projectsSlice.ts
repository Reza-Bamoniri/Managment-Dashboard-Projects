import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../../types/project";
import { createProject,
   getProjects,
   updateProject as updateProjectApi,
   deleteProject as deleteProjectApi,
   getProjectById

   } from "../../services/projectService";




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



export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id: string) => {
    const project = await getProjectById(id);

    return project;
  }
);




export const createProjectThunk = createAsyncThunk(
  "projects/createProject",
  async (project: Omit<Project, "id">) => {
    const newProject = await createProject(project);

    return newProject;
  }
);


export const updateProjectThunk = createAsyncThunk(
  "projects/updateProject",
  async ({
    id,
    project,
  }: {
    id: string;
    project: Omit<Project, "id">;
  }) => {
    const updatedProject = await updateProjectApi(id, project);

    return updatedProject;
  }
);



export const deleteProjectThunk = createAsyncThunk(
  "projects/deleteProject",
  async (id: string) => {
    await deleteProjectApi(id);

    return id;
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
    })

    .addCase(createProjectThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
   })

    .addCase(createProjectThunk.fulfilled, (state, action) => {
  state.loading = false;
  state.projects.push(action.payload);
   })

    .addCase(createProjectThunk.rejected, (state) => {
  state.loading = false;
  state.error = "Failed to create project";
   })

    .addCase(updateProjectThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
   })

    .addCase(updateProjectThunk.fulfilled, (state, action) => {
  state.loading = false;

  const index = state.projects.findIndex(
    (project) => project.id === action.payload.id
  );

  if (index !== -1) {
    state.projects[index] = action.payload;
  }
   })

     .addCase(updateProjectThunk.rejected, (state) => {
  state.loading = false;
  state.error = "Failed to update project";
   })

     .addCase(deleteProjectThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
  })

     .addCase(deleteProjectThunk.fulfilled, (state, action) => {
  state.loading = false;

  state.projects = state.projects.filter(
    (project) => project.id !== action.payload
  );
  })

     .addCase(deleteProjectThunk.rejected, (state) => {
  state.loading = false;
  state.error = "Failed to delete project";
  })
},

});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;