import { useState } from "react";
import { toast } from "sonner";

import { useAppDispatch } from "../store/hooks";
import {
  updateProjectThunk,
} from "../features/projects/projectsSlice";

import type { Project } from "../types/project";
import type { ProjectFormData } from "../components/projects/ProjectForm";

function useProjectEdit(project: Project | null) {
  const dispatch = useAppDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const updateProject = async (data: ProjectFormData) => {
    if (!project) return;

    try {
      await dispatch(
        updateProjectThunk({
          id: project.id,
          project: {
            ...data,
            managerId: project.managerId,
            memberIds: project.memberIds,
          },
        })
      ).unwrap();

      closeEditModal();

      toast.success("Project updated successfully.");
    } catch {
      toast.error("Failed to update project.");
    }
  };

  return {
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    updateProject,
  };
}

export default useProjectEdit;