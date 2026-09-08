import { useEffect, useMemo, useState } from "react";

import TasksHeader from "../components/tasks/TasksHeader";
import TaskStats from "../components/tasks/TaskStats";
import TaskFilters from "../components/tasks/TaskFilters";
import TasksTable from "../components/tasks/table/TasksTable";
import TasksPagination from "../components/tasks/TasksPagination";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTasks } from "../features/tasks/tasksSlice";
import { fetchProjects } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";

import type { Task, TaskPriority, TaskStatus } from "../types/task";

function Tasks() {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const projects = useAppSelector((state) => state.projects.projects);
  const users = useAppSelector((state) => state.users.users);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TaskStatus | "all">("all");
  const [priority, setPriority] = useState<TaskPriority | "all">("all");
  const [projectId, setProjectId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
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

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    console.log("Delete task:", task.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

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

      <TasksTable
        tasks={filteredTasks}
        projects={projects}
        users={users}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <TasksPagination
        currentPage={currentPage}
        totalItems={filteredTasks.length}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <div>
          {/* TaskModal will be added here */}
        </div>
      )}
    </div>
  );
}

export default Tasks;