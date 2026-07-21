import { mockTasks } from "../mock/tasks";
import type { Task } from "../types/task";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const taskService = {
  async getTasks(): Promise<Task[]> {
    await delay(1000);

    return [...mockTasks];
  },
};