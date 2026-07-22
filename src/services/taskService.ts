import { mockTasks } from "../mock/tasks";
import type { Task } from "../types/task";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const taskService = {
  async getTasks(): Promise<Task[]> {
    await delay(1000);
    return [...mockTasks];
  },

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    await delay(500);
    return { id: Date.now(), ...task };
  },

  async updateTask(task: Task): Promise<Task> {
    await delay(500);
    return task;
  },

  async deleteTask(_id: number): Promise<void> {
    await delay(500);
  },
};