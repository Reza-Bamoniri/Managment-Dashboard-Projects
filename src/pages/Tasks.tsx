import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import TasksHeader from "../components/tasks/TasksHeader";
import TaskStats from "../components/tasks/TaskStats";
import TaskFilters from "../components/tasks/TaskFilters";
import TasksTable from "../components/tasks/table/TasksTable";
import TasksPagination from "../components/tasks/TasksPagination";
import TaskModal from "../components/tasks/TaskModal";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import {
  createTaskThunk,
  deleteTaskThunk,
  fetchTasks,
  updateTaskThunk,
} from "../features/tasks/tasksSlice";

import { fetchProjects } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../types/task";

import type { TaskFormData } from "../components/tasks/TaskForm";

import usePagination from "../hooks/usePagination";

function Tasks() {
  const dispatch = useAppDispatch();

  const {
    tasks,
    loading,
    error,
  } = useAppSelector((state) => state.tasks);

  const projects = useAppSelector(
    (state) => state.projects.projects
  );

  const users = useAppSelector(
    (state) => state.users.users
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TaskStatus | "all">("all");
  const [priority, setPriority] = useState<TaskPriority | "all">("all");
  const [projectId, setProjectId] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return [...tasks].reverse().filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || task.status === status;

      const matchesPriority =
        priority === "all" || task.priority === priority;

      const matchesProject =
        projectId === "all" || task.projectId === projectId;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesProject
      );
    });
  }, [tasks, search, status, priority, projectId]);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedTasks,
    setCurrentPage,
  } = usePagination(filteredTasks, 5);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = async (task: Task) => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const result = await Swal.fire({
      title: "Delete task?",
      text: `Are you sure you want to delete "${task.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
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

    if (!result.isConfirmed) {
      return;
    }

    try {
      await dispatch(deleteTaskThunk(task.id)).unwrap();

      toast.success("Task deleted successfully.");
    } catch {
      toast.error("Failed to delete task.");
    }
  };

  const handleTaskSubmit = async (data: TaskFormData) => {
    try {
      if (editingTask) {
        await dispatch(
          updateTaskThunk({
            id: editingTask.id,
            task: {
              ...data,
              completedAt:
                data.status === "completed"
                  ? editingTask.completedAt ??
                    new Date().toISOString()
                  : null,
            },
          })
        ).unwrap();

        toast.success("Task updated successfully.");
      } else {
        await dispatch(
          createTaskThunk({
            ...data,
            completedAt:
              data.status === "completed"
                ? new Date().toISOString()
                : null,
          })
        ).unwrap();

        toast.success("Task created successfully.");
      }

      handleCloseModal();
    } catch {
      toast.error(
        editingTask
          ? "Failed to update task."
          : "Failed to create task."
      );
    }
  };

  /*
   * Initial loading
   *
   * فقط زمانی صفحه Loading می‌شود که هنوز Taskای نداریم
   * و در حال دریافت اولیه اطلاعات هستیم.
   */
  if (loading && tasks.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <div
            className="
              mx-auto h-10 w-10 animate-spin rounded-full
              border-4 border-gray-200 border-t-green-600
              dark:border-gray-700 dark:border-t-green-500
            "
          />

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading tasks...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Initial fetch error
   *
   * اگر دریافت اولیه Taskها شکست خورد،
   * صفحه Error نمایش داده می‌شود.
   */
  if (error && tasks.length === 0) {
    return (
      <div
        className="
          flex min-h-100 items-center justify-center
          rounded-2xl bg-white p-8 shadow-2xl
          dark:bg-gray-900 dark:shadow-black/40
        "
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Failed to load tasks
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Something went wrong while loading the tasks.
          </p>

          <button
            type="button"
            onClick={() => dispatch(fetchTasks())}
            className="
              mt-5 cursor-pointer rounded-xl
              bg-green-600 px-5 py-2.5
              text-sm font-semibold text-white
              transition hover:bg-green-700
              dark:bg-green-500 dark:hover:bg-green-600
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TasksHeader onAddTask={handleAddTask} />

      <TaskStats />

      <TaskFilters
        search={search}
        status={status}
        priority={priority}
        projectId={projectId}
        projectOptions={projects}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
        onPriorityChange={(value) => {
          setPriority(value);
          setCurrentPage(1);
        }}
        onProjectChange={(value) => {
          setProjectId(value);
          setCurrentPage(1);
        }}
      />

      {tasks.length === 0 ? (
        <section
          className="
            rounded-2xl bg-white p-10 text-center shadow-2xl
            dark:bg-gray-900 dark:shadow-black/40
          "
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            No tasks yet
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Create your first task to get started.
          </p>

          <button
            type="button"
            onClick={handleAddTask}
            className="
              mt-5 cursor-pointer rounded-xl
              bg-green-600 px-5 py-2.5
              text-sm font-semibold text-white
              transition hover:bg-green-700
              dark:bg-green-500 dark:hover:bg-green-600
            "
          >
            Add Task
          </button>
        </section>
      ) : filteredTasks.length === 0 ? (
        <section
          className="
            rounded-2xl bg-white p-10 text-center shadow-2xl
            dark:bg-gray-900 dark:shadow-black/40
          "
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            No tasks found
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            No tasks match your current search or filters.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("all");
              setPriority("all");
              setProjectId("all");
              setCurrentPage(1);
            }}
            className="
              mt-5 cursor-pointer rounded-xl
              border border-gray-200 bg-white
              px-5 py-2.5 text-sm font-medium
              text-gray-600 transition hover:bg-gray-100
              dark:border-gray-700 dark:bg-gray-950
              dark:text-gray-300 dark:hover:bg-gray-800
            "
          >
            Clear Filters
          </button>
        </section>
      ) : (
        <>
          <TasksTable
            tasks={paginatedTasks}
            projects={projects}
            users={users}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />

          <TasksPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          projects={projects}
          users={users}
          onSubmit={handleTaskSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Tasks;