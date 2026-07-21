import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Finish Vue Task",
    description: "Complete the technical assessment.",
    status: "In Progress",
    dueDate: "2026-07-25",
  },
  {
    id: 2,
    title: "Review Pull Request",
    description: "Review teammate's code changes.",
    status: "Pending",
    dueDate: "2026-07-27",
  },
  {
    id: 3,
    title: "Deploy Application",
    description: "Deploy the latest version to production.",
    status: "Done",
    dueDate: "2026-07-22",
  },
];