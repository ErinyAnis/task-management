import { defineStore } from "pinia";
import { ref } from "vue";

import type { Task } from "../types/task";
import { taskService } from "../services/taskService";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref("");

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

  function addTask(task: Omit<Task, "id">) {
  tasks.value.unshift({
    id: Date.now(),
    ...task,
  });
}

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
  };
});