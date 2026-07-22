import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Prepare Sprint Planning",
    description: "Create the agenda and gather requirements for the next sprint planning meeting.",
    status: "In Progress",
    dueDate: "2026-07-25",
  },
  {
    id: 2,
    title: "Update Project Documentation",
    description: "Document the latest API changes and onboarding instructions for new team members.",
    status: "Pending",
    dueDate: "2026-07-28",
  },
  {
    id: 3,
    title: "Fix Login Validation Bug",
    description: "Resolve the issue where invalid email addresses bypass client-side validation.",
    status: "Done",
    dueDate: "2026-07-21",
  },
  {
    id: 4,
    title: "Design Dashboard Widgets",
    description: "Finalize the layout and styling for the analytics dashboard cards.",
    status: "Pending",
    dueDate: "2026-07-30",
  },
  {
    id: 5,
    title: "Optimize Image Loading",
    description: "Implement lazy loading and optimize large images to improve page performance.",
    status: "In Progress",
    dueDate: "2026-07-29",
  },
];