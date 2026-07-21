export type TaskStatus = "Pending" | "In Progress" | "Done";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}