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

function updateTask(updatedTask: Task) {
  const index = tasks.value.findIndex(
    (task) => task.id === updatedTask.id
  );

  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
}

function deleteTask(taskId: number) {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
}

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };
});