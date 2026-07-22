import { defineStore } from "pinia";
import { ref } from "vue";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref("");
  const actionLoading = ref(false);
  const actionError = ref("");

  async function fetchTasks() {
    loading.value = true;
    error.value = "";
    try {
      tasks.value = await taskService.getTasks();
    } catch (err) {
      error.value = "Failed to load tasks.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function addTask(task: Omit<Task, "id">) {
    actionLoading.value = true;
    actionError.value = "";
    try {
      const newTask = await taskService.createTask(task);
      tasks.value.unshift(newTask);
    } catch (err) {
      actionError.value = "Failed to add task.";
      console.error(err);
    } finally {
      actionLoading.value = false;
    }
  }

  async function updateTask(updatedTask: Task) {
    actionLoading.value = true;
    actionError.value = "";
    try {
      const saved = await taskService.updateTask(updatedTask);
      const index = tasks.value.findIndex((t) => t.id === saved.id);
      if (index !== -1) tasks.value[index] = saved;
    } catch (err) {
      actionError.value = "Failed to update task.";
      console.error(err);
    } finally {
      actionLoading.value = false;
    }
  }

  async function deleteTask(taskId: number) {
    actionLoading.value = true;
    actionError.value = "";
    try {
      await taskService.deleteTask(taskId);
      tasks.value = tasks.value.filter((t) => t.id !== taskId);
    } catch (err) {
      actionError.value = "Failed to delete task.";
      console.error(err);
    } finally {
      actionLoading.value = false;
    }
  }

  return {
    tasks, loading, error, actionLoading, actionError,
    fetchTasks, addTask, updateTask, deleteTask,
  };
});